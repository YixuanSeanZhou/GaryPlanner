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
        'course-29': { id: 'course-29', content: 'CSE 141L'},
        'course-110': { id: 'course-110', content: 'PIG 101'},
        'course-111': { id: 'course-111', content: 'GARY 1'},
        'course-112': { id: 'course-112', content: 'GARY 2'},
        'course-113': { id: 'course-113', content: 'GARY 3'},
        'course-114': { id: 'course-114', content: 'GARY 4'},
        'course-115': { id: 'course-115', content: 'GARY 5'},
        'course-116': { id: 'course-116', content: 'GARY 6'},
        'course-117': { id: 'course-117', content: 'GARY 7'},
        'course-118': { id: 'course-118', content: 'GARY 8'},
        'course-119': { id: 'course-119', content: 'GARY 9'},
        'course-120': { id: 'course-120', content: 'PNC 130'},
        'course-121': { id: 'course-121', content: 'GARY 11'},
        'course-122': { id: 'course-122', content: 'GARY 12'},
        'course-123': { id: 'course-123', content: 'GARY 13'},
        'course-124': { id: 'course-124', content: 'GARY 14'},
        'course-125': { id: 'course-125', content: 'GARY 15'},
        'course-126': { id: 'course-126', content: 'GARY 16'},
        'course-127': { id: 'course-127', content: 'GARY 17'},
        'course-128': { id: 'course-128', content: 'GARY 18'},
        'course-130': { id: 'course-130', content: 'CSLW 1'},
        'course-131': { id: 'course-131', content: 'GARY 101'},
        'course-132': { id: 'course-132', content: 'GARY 120'},
        'course-133': { id: 'course-133', content: 'GARY 130'},
        'course-134': { id: 'course-134', content: 'GARY 140'},
        'course-135': { id: 'course-135', content: 'GARY 152'},
        'course-136': { id: 'course-136', content: 'GARY 167'},
        'course-137': { id: 'course-137', content: 'GARY 171'},
        'course-138': { id: 'course-138', content: 'GARY 184'},
        'course-139': { id: 'course-139', content: 'GARY 198'},
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
        'SearchColumn': {
            id: 'SearchColumn',
            title: 'Search',
            courseIds: ['course-110','course-111', 'course-112', 'course-113', 'course-114','course-115', 'course-116', 'course-117', 'course-118', 'course-119',
                        'course-120','course-121', 'course-122', 'course-123', 'course-124','course-125', 'course-126', 'course-127', 'course-128', 'course-129',
                        'course-130','course-131', 'course-132', 'course-133', 'course-134','course-135', 'course-136', 'course-137', 'course-138', 'course-139']
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