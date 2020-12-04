/*
 * This is the backup placeholder data to be used in the 4YP calendar. 
 * Kept just for sanity sake in case it all goes to shit
 * 
 * NJM - 11/10/20
 */
const placeholderData = {
    // Individual items in our calendar that can be moved
    courses: {
        'course-1': { id: 'course-1', content: 'MATH 20C', locked: false},
        'course-2': { id: 'course-2', content: 'CSE 11', locked: true},
        'course-3': { id: 'course-3', content: 'CAT 1', locked: false},
        'course-4': { id: 'course-4', content: 'ANTH 3', locked: false},
        'course-5': { id: 'course-5', content: 'MATH 18', locked: false},
        'course-6': { id: 'course-6', content: 'CSE 12'}, locked: false,
        'course-7': { id: 'course-7', content: 'CSE 15L', locked: false},
        'course-8': { id: 'course-8', content: 'CSE 30', locked: false},
        'course-9': { id: 'course-9', content: 'CSE 100', locked: false},
        'course-10': { id: 'course-10', content: 'CSE 101', locked: false},
        'course-11': { id: 'course-11', content: 'CSE 105', locked: false},
        'course-12': { id: 'course-12', content: 'CSE 140', locked: false},
        'course-13': { id: 'course-13', content: 'CSE 140L', locked: false},
        'course-14': { id: 'course-14', content: 'CSE 141', locked: false},
        'course-15': { id: 'course-15', content: 'GE', locked: false},
        'course-16': { id: 'course-16', content: 'Writing', locked: false},
        'course-17': { id: 'course-17', content: 'CSE 127', locked: false},
        'course-18': { id: 'course-18', content: 'CSE 130', locked: false},
        'course-19': { id: 'course-19', content: 'CSE 123', locked: false},
        'course-20': { id: 'course-20', content: 'CSE 152', locked: false},
        'course-21': { id: 'course-21', content: 'CSE 167', locked: false},
        'course-22': { id: 'course-22', content: 'PHYS 2A', locked: false},
        'course-23': { id: 'course-23', content: 'CHEM 6A', locked: false},
        'course-24': { id: 'course-24', content: 'CSE 20', locked: false},
        'course-25': { id: 'course-25', content: 'CSE 21', locked: false},
        'course-26': { id: 'course-26', content: 'CSE 103', locked: false},
        'course-27': { id: 'course-27', content: 'CSE 110', locked: false},
        'course-28': { id: 'course-28', content: 'Elective', locked: false},
        'course-29': { id: 'course-29', content: 'CSE 141L', locked: false},
        'course-110': { id: 'course-110', content: 'PIG 101', locked: false},
        'course-111': { id: 'course-111', content: 'GARY 1', locked: false},
        'course-112': { id: 'course-112', content: 'GARY 2', locked: false},
        'course-113': { id: 'course-113', content: 'GARY 3', locked: false},
        'course-114': { id: 'course-114', content: 'GARY 4', locked: false},
        'course-115': { id: 'course-115', content: 'GARY 5', locked: false},
        'course-116': { id: 'course-116', content: 'GARY 6', locked: false},
        'course-117': { id: 'course-117', content: 'GARY 7', locked: false},
        'course-118': { id: 'course-118', content: 'GARY 8', locked: false},
        'course-119': { id: 'course-119', content: 'GARY 9', locked: false},
        'course-120': { id: 'course-120', content: 'PNC 130', locked: false},
        'course-121': { id: 'course-121', content: 'GARY 11', locked: false},
        'course-122': { id: 'course-122', content: 'GARY 12', locked: false},
        'course-123': { id: 'course-123', content: 'GARY 13', locked: false},
        'course-124': { id: 'course-124', content: 'GARY 14', locked: false},
        'course-125': { id: 'course-125', content: 'GARY 15', locked: false},
        'course-126': { id: 'course-126', content: 'GARY 16', locked: false},
        'course-127': { id: 'course-127', content: 'GARY 17', locked: false},
        'course-128': { id: 'course-128', content: 'GARY 18', locked: false},
        'course-129': { id: 'course-129', content: 'GARY 19', locked: false},
        'course-130': { id: 'course-130', content: 'CSLW 1', locked: false},
        'course-131': { id: 'course-131', content: 'GARY 101', locked: false},
        'course-132': { id: 'course-132', content: 'GARY 120', locked: false},
        'course-133': { id: 'course-133', content: 'GARY 130', locked: false},
        'course-134': { id: 'course-134', content: 'GARY 140', locked: false},
        'course-135': { id: 'course-135', content: 'GARY 152', locked: false},
        'course-136': { id: 'course-136', content: 'GARY 167', locked: false},
        'course-137': { id: 'course-137', content: 'GARY 171', locked: false},
        'course-138': { id: 'course-138', content: 'GARY 184', locked: false},
        'course-139': { id: 'course-139', content: 'GARY 198', locked: false},
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