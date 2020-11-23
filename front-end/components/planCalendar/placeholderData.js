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
        'course-9': { id: 'course-9', content: 'CSE 100'},
        'course-10': { id: 'course-10', content: 'CSE 101'},
        'course-11': { id: 'course-11', content: 'CSE 105'},
        'course-12': { id: 'course-12', content: 'CSE 140'},
        'course-13': { id: 'course-13', content: 'CSE 140L'},
        'course-14': { id: 'course-14', content: 'CSE 141'},
        'course-15': { id: 'course-15', content: 'GE'},
        'course-16': { id: 'course-16', content: 'Writing'},
        'course-17': { id: 'course-17', content: 'CSE 127'},
        'course-18': { id: 'course-18', content: 'CSE 130'},
        'course-19': { id: 'course-19', content: 'CSE 123'},
        'course-20': { id: 'course-20', content: 'CSE 152'},
        'course-21': { id: 'course-21', content: 'CSE 167'},
        'course-22': { id: 'course-22', content: 'PHYS 2A'},
        'course-23': { id: 'course-23', content: 'CHEM 6A'},
        'course-24': { id: 'course-24', content: 'CSE 20'},
        'course-25': { id: 'course-25', content: 'CSE 21'},
        'course-26': { id: 'course-26', content: 'CSE 103'},
        'course-27': { id: 'course-27', content: 'CSE 110'},
        'course-28': { id: 'course-28', content: 'Elective'},
        'course-29': { id: 'course-19', content: 'CSE 141L'}

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
            courseIds: ['course-5','course-15','course-24','course-22']
        },
        'SP19': {
            id: 'SP19',
            title: 'Spring',
            courseIds: ['course-6','course-15','course-16','course-23']
        },
        'FA19': {
            id: 'FA19',
            title: 'Fall',
            courseIds: ['course-7','course-8','course-25','course-15']
        },
        'WI19': {
            id: 'WI19',
            title: 'Winter',
            courseIds: ['course-9','course-15','course-16','course-26']
        },
        'SP20': {
            id: 'SP20',
            title: 'Spring',
            courseIds: ['course-10','course-15','course-16','course-11']
        },
        'FA20': {
            id: 'FA20',
            title: 'Fall',
            courseIds: ['course-27','course-17','course-15','course-28']
        },
        'WI20': {
            id: 'WI20',
            title: 'Winter',
            courseIds: ['course-18','course-12','course-13','course-15']
        },
        'SP21': {
            id: 'SP21',
            title: 'Spring',
            courseIds: ['course-14','course-29','course-16','course-15']
        },
        'FA21': {
            id: 'FA21',
            title: 'Fall',
            courseIds: ['course-19','course-15','course-28','course-28']
        },
        'WI21': {
            id: 'WI21',
            title: 'Winter',
            courseIds: ['course-20','course-15','course-28','course-16']
        },
        'SP22': {
            id: 'SP22',
            title: 'Spring',
            courseIds: ['course-21','course-15','course-28','course-28']
        },
        
    },

    // Used to order our quarters (also used to reorder, but we dont use that)
    quarterOrder: ['FA18','WI18','SP19','FA19','WI19','SP20','FA20','WI20','SP21','FA21','WI21','SP22'], // Depreciated
    yearOrder: ['18-19','19-20','20-21','21-22'],
    years: {
        '18-19': {
            id: '18-19',
            title: '18-19',
            quarterIds: ['FA18','WI18','SP19']
        },
        '19-20': {
            id: '19-20',
            title: '19-20',
            quarterIds: ['FA19','WI19','SP20']
        },
        '20-21': {
            id: '20-21',
            title: '20-21',
            quarterIds: ['FA20','WI20','SP21']
        },
        '21-22': {
            id: '21-22',
            title: '21-22',
            quarterIds: ['FA21','WI21','SP22']
        }
    }
};

export default placeholderData;