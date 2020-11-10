/*
 * This is placeholder data to be used in the 4YP calendar. 
 * This is the format used by the react-beautiful-dnd so we can
 * have a pretty calendar.
 *
 * NJM - 11/10/20
 */
const placeholderData = {
    // Individual items in our calendar that can be moved
    courses: {
        'course-1': { id: 'course-1', content: 'MATH 20C'},
        'course-2': { id: 'course-2', content: 'CSE 11'},
        'course-3': { id: 'course-3', content: 'CAT 1'},
        'course-4': { id: 'course-4', content: 'ANTH 3'}
    },
    // The columns of our calendar
    quarters: {
        'quarter-1': {
            id: 'quarter-1',
            title: 'Fall',
            courseIds: ['course-1', 'course-2', 'course-3', 'course-4'],
        }
    },
    // Used to order our quarters (also used to reorder, but we dont use that)
    quarterOrder: ['quarter-1']
};

export default placeholderData;