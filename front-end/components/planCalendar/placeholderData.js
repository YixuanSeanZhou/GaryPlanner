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
        'course-10': { id: 'course-10', content: 'PIG 101'},
        'course-11': { id: 'course-11', content: 'GARY 1'},
        'course-12': { id: 'course-12', content: 'GARY 2'},
        'course-13': { id: 'course-13', content: 'GARY 3'},
        'course-14': { id: 'course-14', content: 'GARY 4'},
        'course-15': { id: 'course-15', content: 'GARY 5'},
        'course-16': { id: 'course-16', content: 'GARY 6'},
        'course-17': { id: 'course-17', content: 'GARY 7'},
        'course-18': { id: 'course-18', content: 'GARY 8'},
        'course-19': { id: 'course-19', content: 'GARY 9'},
        'course-20': { id: 'course-20', content: 'PNC 130'},
        'course-21': { id: 'course-21', content: 'GARY 11'},
        'course-22': { id: 'course-22', content: 'GARY 12'},
        'course-23': { id: 'course-23', content: 'GARY 13'},
        'course-24': { id: 'course-24', content: 'GARY 14'},
        'course-25': { id: 'course-25', content: 'GARY 15'},
        'course-26': { id: 'course-26', content: 'GARY 16'},
        'course-27': { id: 'course-27', content: 'GARY 17'},
        'course-28': { id: 'course-28', content: 'GARY 18'},
        'course-29': { id: 'course-29', content: 'GARY 19'},
        'course-30': { id: 'course-30', content: 'CSLW 1'},
        'course-31': { id: 'course-31', content: 'GARY 101'},
        'course-32': { id: 'course-32', content: 'GARY 120'},
        'course-33': { id: 'course-33', content: 'GARY 130'},
        'course-34': { id: 'course-34', content: 'GARY 140'},
        'course-35': { id: 'course-35', content: 'GARY 152'},
        'course-36': { id: 'course-36', content: 'GARY 167'},
        'course-37': { id: 'course-37', content: 'GARY 171'},
        'course-38': { id: 'course-38', content: 'GARY 184'},
        'course-39': { id: 'course-39', content: 'GARY 198'}
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
        'SearchColumn': {
            id: 'SearchColumn',
            title: 'Search',
            courseIds: ['course-10','course-11', 'course-12', 'course-13', 'course-14','course-15', 'course-16', 'course-17', 'course-18', 'course-19',
                        'course-20','course-21', 'course-22', 'course-23', 'course-24','course-25', 'course-26', 'course-27', 'course-28', 'course-29',
                        'course-30','course-31', 'course-32', 'course-33', 'course-34','course-35', 'course-36', 'course-37', 'course-38', 'course-39']
        }
        
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