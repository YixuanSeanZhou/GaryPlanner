from __future__ import annotations

from typing import List

from ..setup import db

from .user import User


class Friend(db.Model):
    """
    @author: YixuanZ
    """
    __tablename__ = "Friends"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('Users.id'),
                          nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('Users.id'),
                            nullable=False)
    accepted = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, **kwargs):
        super(Friend, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['sender_id'] = self.sender_id
        ret['receiver_id'] = self.receiver_id
        ret['accepted'] = self.accepted
        return ret

    def save(self):
        db.session.commit()

    @staticmethod
    def add_friend(sender_id: int, receiver_id: int) -> (bool, Friend):
        f = Friend.query.filter_by(sender_id=sender_id,
                                   receiver_id=receiver_id).first()
        if f:
            return False, None
        r = Friend.query.filter_by(sender_id=receiver_id,
                                   receiver_id=sender_id).first()
        if r:
            return False, None
        f = Friend(sender_id=sender_id, receiver_id=receiver_id,
                   accepted=False)
        db.session.add(f)
        f.save()
        return True, f

    @staticmethod
    def accept_friend(sender_id: int, receiver_id: int) -> (bool, str, Friend):
        f = Friend.query.filter_by(sender_id=sender_id,
                                   receiver_id=receiver_id).first()
        if not f:
            return False, "request not found", None
        elif f.accepted:
            return False, "request already accepted", f
        else:
            f.accepted = True
            f.save()
            return True, "success", f

    @staticmethod
    def is_friend(user1_id: int, user2_id: int) -> bool:
        f = Friend.\
            get_friend_by_sender_and_receiver(sender_id=user1_id,
                                              receiver_id=user2_id).first()
        r = Friend.\
            get_friend_by_sender_and_receiver(sender_id=user2_id,
                                              receiver_id=user1_id).first()
        if f:
            return f.accepted
        if r:
            return r.accepted
        return False

    @staticmethod
    def get_friend_by_sender_and_receiver(sender_id: int,
                                          receiver_id: int) -> Friend:
        return Friend.query.filter_by(sender_id=sender_id,
                                      receiver_id=receiver_id).first()

    @staticmethod
    def get_requests_by_sender(sender_id: int) -> List[Friend]:
        return Friend.query.filter_by(sender_id=sender_id).all()

    @staticmethod
    def get_friends_for_user(user_id: int) -> List[Friend]:
        f_list = []
        fs = Friend.query.filter_by(sender_id=user_id).all()
        for f in fs:
            if f.accepted:
                f_list.append(f)
        rs = Friend.query.filter_by(receiver_id=user_id).all()
        for r in rs:
            if r.accepted:
                f_list.append(r)
        return f_list

    @staticmethod
    def get_firendship_by_id(f_id: int) -> Friend:
        return Friend.query.filter_by(id=f_id).first()

    @staticmethod
    def get_pending_friend_request(user_id: int) -> List[Friend]:
        r_list = []
        fs = Friend.query.filter_by(receiver_id=user_id).all()
        for f in fs:
            if not f.accepted:
                r_list.append(f)
        return r_list

    @staticmethod
    def remove_friend(user1_id: int, user2_id: int) -> (bool, str):
        f = Friend.query.filter_by(sender_id=user1_id,
                                   receiver_id=user2_id).first()
        if f and f.accepted:
            db.session.delete(f)
            f.save()
            return True, 'friendship deleted'
        f = Friend.query.filter_by(sender_id=user2_id,
                                   receiver_id=user1_id).first()
        if f and f.accepted:
            db.session.delete(f)
            f.save()
            return True, 'friendship deleted'
        return False, 'have not been friends'