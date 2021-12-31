const Users = [
    {
        'user_id': '1',
        'user_name': 'ddanner97',
        'email': 'ddanner97@gmail.com',
        'password': 'Lynn9fay--'
    }
]

const Programs = [
    {
        'program_id': '1',
        'name': 'Mountain Dog Upper/Lower Hybrid',
        'date-Created': '8/6/2019',
        'last-Workout': '12/3/2021',
        'user_id': '1'
    }, {
        'program_id': '2',
        'name': 'Upper/Lower Hybrid',
        'date-Created': '8/6/2020',
        'last-Workout': '12/3/2020',
        'user_id': '1'
    }, {
        'program_id': '3',
        'name': 'Push Pull Legs',
        'date-Created': '10/6/2020',
        'last-Workout': '7/14/2021',
        'user_id': '1'
    }, {
        'program_id': '4',
        'name': 'Full Body',
        'date-Created': '5/6/2021',
        'last-Workout': '10/14/2021',
        'user_id': '1'
    }

]

const Routines = [
    {
        'routine_id': '1',
        'routine_name': 'Day 1: Upper Body',
        'program_id': '1',
        'last_workout': '12/3/2021'
    },
    {
        'routine_id': '2',
        'routine_name': 'Day 2: Lower Body',
        'program_id': '1',
        'last_workout': '12/2/2021'  
    }, 
    {
        'routine_id': '3',
        'routine_name': 'Day 3: Arm Day',
        'program_id': '1',
        'last_workout': '12/1/2021'  
    },
    {
        'routine_id': '4',
        'routine_name': 'Day 4: Lower Body',
        'program_id': '1',
        'last_workout': '11/28/2021'
    },
    {
        'routine_id': '5',
        'routine_name': 'Day 5: Upper Body',
        'program_id': '1',
        'last_workout': '12/1/2021'  
    }
    
]

const Exercises = [
    {
        'exercise_id': '1',
        'name': 'Seated Row',
        'user_id': '1',
    },
    {
        'exercise_id': '2',
        'name': 'Meadows Row',
        'user_id': '1',
    },
    {
        'exercise_id': '3',
        'name': 'Lat Pull Down',
        'user_id': '1',
    },
    {
        'exercise_id': '4',
        'name': 'Slight Incline DB Press',
        'user_id': '1',
    },
    {
        'exercise_id': '5',
        'name': 'Bench Pres',
        'user_id': '1',
    },
    {
        'exercise_id': '6',
        'name': 'Rear Delt Fly',
        'user_id': '1',
    },
    {
        'exercise_id': '7',
        'name': 'Lateral Shoulder raises',
        'user_id': '1',
    }
]

const Exercise_routines = [
    {
        'bridge_id': '1',
        'routine_id': '1',
        'exercise_id': '1'
    },
    {
        'bridge_id': '1',
        'routine_id': '1',
        'exercise_id': '2'
    },
    {
        'bridge_id': '1',
        'routine_id': '1',
        'exercise_id': '3'
    },
    {
        'bridge_id': '1',
        'routine_id': '1',
        'exercise_id': '4'
    },
    {
        'bridge_id': '1',
        'routine_id': '1',
        'exercise_id': '5'
    },
    {
        'bridge_id': '1',
        'routine_id': '1',
        'exercise_id': '6'
    },
    {
        'bridge_id': '1',
        'routine_id': '1',
        'exercise_id': '7'
    }
]

export {Users, Programs, Routines, Exercises, Exercise_routines }