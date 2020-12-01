/*
 * This is placeholder data to be used in the 4YP calendar. 
 * This is the format used by the react-beautiful-dnd so we can
 * have a pretty calendar.
 *
 * NJM - 11/10/20
 */
const placeholderData = {
        "courses": {
            "course-1": {
                "content": "CSE 11",
                "id": "course-1",
                "locked": true
            },
            "course-2": {
                "content": "CSE 20",
                "id": "course-2",
                "locked": true
            },
            "course-3": {
                "content": "CSE 12",
                "id": "course-3",
                "locked": true
            },
            "course-4": {
                "content": "CSE 15L",
                "id": "course-4",
                "locked": false
            },
            "course-5": {
                "content": "CSE 21",
                "id": "course-5",
                "locked": true
            },
            "course-6": {
                "content": "CSE 30",
                "id": "course-6",
                "locked": true
            }
        },
        "current_quarter": "SP19",
        "quarters": {
            "FA18": {
                "courseIds": [],
                "id": "FA18",
                "title": "Fall"
            },
            "WI19": {
                "courseIds": [
                    "course-1",
                    "course-2"
                ],
                "id": "WI19",
                "title": "Winter"
            },
            "SP19": {
                "courseIds": [
                    "course-3",
                    "course-4",
                    "course-5"
                ],
                "id": "SP19",
                "title": "Spring"
            },
            "FA19": {
                "courseIds": [
                    "course-6"
                ],
                "id": "FA19",
                "title": "Fall"
            },
            "WI20": {
                "courseIds": [],
                "id": "WI20",
                "title": "Winter"
            },
            "SP20": {
                "courseIds": [],
                "id": "SP20",
                "title": "Spring"
            },
            "FA20": {
                "courseIds": [],
                "id": "FA20",
                "title": "Fall"
            },
            "WI21": {
                "courseIds": [],
                "id": "WI21",
                "title": "Winter"
            },
            "SP21": {
                "courseIds": [],
                "id": "SP21",
                "title": "Spring"
            },
            "FA21": {
                "courseIds": [],
                "id": "FA21",
                "title": "Fall"
            },
            "WI22": {
                "courseIds": [],
                "id": "WI22",
                "title": "Winter"
            },
            "SP22": {
                "courseIds": [],
                "id": "SP22",
                "title": "Spring"
            },
            'SearchColumn': {
                id: 'SearchColumn',
                title: 'Search',
                courseIds: []
            }
        },
        "user_id": 1
};

export default placeholderData;