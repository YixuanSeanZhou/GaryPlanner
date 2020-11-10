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
        'course-4': { id: 'course-4', content: 'ANTH 3'},
        'course-5': { id: 'course-5', content: 'MATH 18'},
        'course-6': { id: 'course-6', content: 'CSE 12'},
        'course-7': { id: 'course-7', content: 'CSE 15L'},
        'course-8': { id: 'course-8', content: 'CSE 30'},
        'course-9': { id: 'course-8', content: 'CSE 100'}
    },
    // The columns of our calendar
    quarters: {
        'FA18': {
            id: 'FA18',
            title: 'Fall',
            courseIds: ['course-1', 'course-2', 'course-3', 'course-4']
        },
        'WI18': {
            id: 'WI18',
            title: 'Winter',
            courseIds: ['course-5']
        },
        'SP19': {
            id: 'SP19',
            title: 'Spring',
            courseIds: ['course-6']
        },
        'FA19': {
            id: 'FA19',
            title: 'Fall',
            courseIds: ['course-7']
        },
        'WI19': {
            id: 'WI19',
            title: 'Winter',
            courseIds: ['course-8']
        },
        'SP20': {
            id: 'SP20',
            title: 'Spring',
            courseIds: ['course-9']
        },
        'FA20': {
            id: 'FA20',
            title: 'Fall',
            courseIds: []
        },
        'WI20': {
            id: 'WI20',
            title: 'Winter',
            courseIds: []
        },
        'SP21': {
            id: 'SP21',
            title: 'Spring',
            courseIds: []
        },
        'FA21': {
            id: 'FA21',
            title: 'Fall',
            courseIds: []
        },
        'WI21': {
            id: 'WI21',
            title: 'Winter',
            courseIds: []
        },
        'SP22': {
            id: 'SP22',
            title: 'Spring',
            courseIds: []
        },
        
    },
    // Used to order our quarters (also used to reorder, but we dont use that)
    quarterOrder: ['FA18','WI18','SP19','FA19','WI19','SP20','FA20','WI20','SP21','FA21','WI21','SP22']
};

export default placeholderData;