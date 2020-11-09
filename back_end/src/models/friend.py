from __future__ import annotations

from typing import List

from ..setup import db


class Friend(db.Model):
    """
    @author: YixuanZ
    """
    __tablename__ = "Friends"

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)

    def __init__(self, **kwargs):
        super(Friend, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['user1_id'] = self.user1_id
        ret['user2_id'] = self.user2_id
        return ret

    def save(self):
        db.session.commit()

    @staticmethod
    def add_friend(user1_id: int, user2_id: int) -> Friend:
        f = Friend.query.filter_by(user1_id=user1_id,
                                   user2_id=user2_id).first()
        if f:
            return None
        f = Friend(user1_id=user1_id, user2_id=user2_id)
        db.session.add(f)
        f.save()
        return f

    @staticmethod
    def is_friend(user1_id: int, user2_id: int) -> bool:
        if Friend.get_freind_by_sender_and_receiver(user1_id=user1_id,
                                                    user2_id=user2_id):
            if Friend.get_freind_by_sender_and_receiver(user1_id=user2_id,
                                                        user2_id=user1_id):
                return True                  
        return False

    @staticmethod
    def get_freind_by_sender_and_receiver(user1_id: int,
                                          user2_id: int) -> Friend:
        return Friend.query.filter_by(user1_id=user1_id,
                                      user2_id=user2_id).first()

    @staticmethod
    def get_requests_by_sender(user1_id: int) -> List[Friend]:
        return Friend.query.filter_by(user1_id=user1_id).all()

    @staticmethod
    def get_friends_for_user(user_id: int) -> List[Friend]:
        f_of_user = Friend.query.filter_by(user1_id=user_id).all()
        for f in f_of_user:
            if not Friend.query.filter_by(user1_id=f.user2_id,
                                          user2_id=f.user1_id).frist():
                f_of_user.remove(f)
        return f_of_user

    @staticmethod
    def get_recived_by_receiver(user2_id: int) -> List[Friend]:
        return Friend.query.filter_by(user2_id=user2_id).all()

    @staticmethod
    def get_firendship_by_id(f_id: int) -> Friend:
        return Friend.query.filter_by(id=f_id).first()

    @staticmethod
    def get_recieved_friend_request(user_id: int) -> List[Friend]:
        return Friend.query.filter_by(user2_id=user_id).all()

    @staticmethod
    def get_sent_friend_request(user_id: int) -> List[Friend]:
        return Friend.query.filter_by(user1_id=user_id).all()

    @staticmethod
    def remove_friend(user1_id: int, user2_id: int) -> bool:
        f = Friend.query.filter_by(user1_id=user1_id,
                                   user2_id=user2_id).first()
        db.session.delete(f)
        f.save()
        f = Friend.query.filter_by(user1_id=user2_id,
                                   user2_id=user1_id).first()
        db.session.delete(f)
        f.save()
        return True
