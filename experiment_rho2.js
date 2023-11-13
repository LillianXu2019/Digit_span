// state variables
var item = 0;  // 0-based item number
var trial = 0;  // 0 or 1
var condition = 'forward';  // 'forward' or 'reverse'
var item_score = 100;  // non-zero value so first item runs

let forward_seqs = [
    [
        [2, 9],
        [3, 8, 6],
        [3, 4, 1, 7],
        [8, 4, 2, 3, 9],
        [3, 8, 9, 1, 7, 4],
        [5, 1, 7, 4, 2, 3, 8],
        [1, 6, 4, 5, 9, 7, 6, 3],
        [5, 3, 8, 7, 1, 2, 4, 6, 9]
    ],
    [
        [4, 6],
        [6, 1, 2],
        [6, 1, 5, 8],
        [5, 2, 1, 8, 6],
        [7, 9, 6, 4, 8, 3],
        [9, 8, 5, 2, 1, 6, 3],
        [2, 9, 7, 6, 3, 1, 5, 4],
        [4, 2, 6, 9, 1, 7, 8, 3, 5]
    ]
];

let practice_seqs = [
    [
        [8, 2]
    ],
    [
        [5, 6]
    ]
]

let reverse_seqs = [
    [
        [2, 5],
        [5, 7, 4],
        [7, 2, 9, 6],
        [4, 1, 3, 5, 7],
        [1, 6, 5, 2, 9, 8],
        [8, 5, 9, 2, 3, 4, 2],
        [6, 9, 1, 6, 3, 2, 5, 8]
    ],
    [
        [6, 3],
        [2, 5, 9],
        [8, 4, 9, 3],
        [9, 7, 8, 5, 2],
        [3, 6, 7, 1, 9, 4],
        [4, 5, 7, 9, 2, 8, 1],
        [3, 1, 7, 9, 5, 4, 8, 2]
    ]
];

/* ************************************ */
/* Define helper functions */
/* ************************************ */
function evalAttentionChecks() {
    var check_percent = 1
    if (run_attention_checks) {
        var attention_check_trials = jsPsych.data.getTrialsOfType('attention-check')
        var checks_passed = 0
        for (var i = 0; i < attention_check_trials.length; i++) {
            if (attention_check_trials[i].correct === true) {
                checks_passed += 1
            }
        }
        check_percent = checks_passed / attention_check_trials.length
    }
    return check_percent
}

var getInstructFeedback = function() {
    return '<div class = centerbox><p class = center-block-text>' + feedback_instruct_text +
        '</p></div>'
}

var arraysEqual = function(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

var setStims = function() {
    curr_seq = []
    stim_array = []
    time_array = []

    if(condition === 'forward'){
        curr_seq = forward_seqs[trial][item];
    } else if(condition === 'reverse') {
        curr_seq = reverse_seqs[trial][item];
    } else {
        curr_seq = practice_seqs[trial][item];
    }
    num_digits = curr_seq.length;

    for (let i=0; i<num_digits; i++){
        let num = curr_seq[i];
        stim_array.push('<div class = centerbox><div class = digit-span-text>' + num.toString() +
            '</div></div>');
        time_array.push(stim_time);
    }

    total_time = num_digits * (stim_time + gap_time)
}

var getTestText = function() {
    return '<div class = centerbox><div class = center-text>' + num_digits + ' Digits</p></div>'
}

var getStims = function() {
    return stim_array
}

var getTimeArray = function() {
    return time_array
}

var getTotalTime = function() {
    return total_time
}

var getFeedback = function() {
    return '<div class = centerbox><div class = center-block-text>' + feedback + '</div></div>'
}

var recordClick = function(elm) {
    response.push(Number($(elm).text()))
    $('#response_box').html(response);
}

var clearResponse = function() {
    $('#response_box').html('');
    response = []
}



/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// generic task variables
var run_attention_checks = false
var attention_check_thresh = 0.65
var sumInstructTime = 0 //ms
var instructTimeThresh = 0 ///in seconds

// task specific variables
var num_digits;
//var num_trials = 14
var curr_seq = []
var stim_time = 1000
var gap_time = 200
var time_array = []
var total_time = 0
var errors = 0
var error_lim = 3
var response = []
setStims()
var stim_array = getStims()

var response_grid =
    '<div class = numbox>' +
    '<div style="border:1px solid black;height:80px; line-height:80px; border-radius:15px;"><div class="numbers"  style="top:0;letter-spacing:1rem;" id="response_box" ></div></div>' +
    '<button id = button_1 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>1</div></div></button>' +
    '<button id = button_2 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>2</div></div></button>' +
    '<button id = button_3 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>3</div></div></button>' +
    '<button id = button_4 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>4</div></div></button>' +
    '<button id = button_5 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>5</div></div></button>' +
    '<button id = button_6 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>6</div></div></button>' +
    '<button id = button_7 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>7</div></div></button>' +
    '<button id = button_8 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>8</div></div></button>' +
    '<button id = button_9 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>9</div></div></button>' +
    '<button class = clear_button id = "ClearButton" onclick = "clearResponse()">Clear</button>' +
    '<button class = submit_button id = "SubmitButton">Submit Answer</button></div>'

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */

/* Enter subject id */
var subject_id = jsPsych.data.getURLVariable('participantID')
console.log("subject_id is " + subject_id)
jsPsych.data.addProperties({subject: subject_id});

// Set up attention check node
var attention_check_block = {
    type: 'attention-check',
    data: {
        trial_id: "attention_check"
    },
    timing_response: 180000,
    response_ends_trial: true,
    timing_post_trial: 200
}

var attention_node = {
    timeline: [attention_check_block],
    conditional_function: function() {
        return run_attention_checks
    }
}

/* define static blocks */
var feedback_instruct_text =
    'Welcome to the number game! It will take less than 5 minutes. Press <strong>"Enter/Return"</strong> to begin.'
var feedback_instruct_block = {
    type: 'html-keyboard-response',
    choices: ['Enter'],
    data: {
        trial_id: "instruction"
    },
    stimulus: getInstructFeedback,
    post_trial_gap: 0,
    trial_duration: 180000
};
/// This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var instructions_block1 = {
    type: 'instructions',
    data: {
        trial_id: "instruction"
    },
    pages: [
        // '<div class = centerbox><p class = block-text>In this test you will have to try to remember a sequence of numbers that will appear on the screen one after the other. At the end of each trial, enter all the numbers into the presented numpad in the sequence in which they occurred. Do your best to memorize the numbers, but do not write them down or use any other external tool to help you remember them.</p><p class = block-text>Trials will start after you end instructions.</p></div>'
        '<div class = centerbox><p class = block-text>Now, you will see some numbers. Please watch carefully. <br><br>After the numbers end, you’ll tell me what numbers you saw using the number pad on your screen. <br><br>Please try your best to repeat the numbers!</p></div>',
    ],
    allow_keys: false,
    show_clickable_nav: true,
    post_trial_gap: 1000,
    allow_backward: false
};

var instructions_block2 = {
    type: 'instructions',
    data: {
        trial_id: "instruction"
    },
    pages: [
        // '<div class = centerbox><p class = block-text>In this test you will have to try to remember a sequence of numbers that will appear on the screen one after the other. At the end of each trial, enter all the numbers into the presented numpad in the sequence in which they occurred. Do your best to memorize the numbers, but do not write them down or use any other external tool to help you remember them.</p><p class = block-text>Trials will start after you end instructions.</p></div>'
        '<div class = centerbox><p class = block-text>When you’re done putting the numbers in the number pad, click “Submit Answer”! <br><br>If you make a mistake when putting in the numbers, you can click “Clear” to start over.</p></div>',
    ],
    allow_keys: false,
    show_clickable_nav: true,
    post_trial_gap: 1000,
    allow_backward: false
};

var instruction_node = {
    timeline: [feedback_instruct_block, instructions_block1, instructions_block2],
    /* This function defines stopping criteria */
    loop_function: function(data) {
        let last_trial = data.last().values()[0];
        if ((last_trial.trial_type == 'instructions') && (last_trial.rt != -1)) {
            rt = last_trial.rt;
            sumInstructTime = sumInstructTime + rt;
        }
        if (sumInstructTime <= instructTimeThresh * 1000) {
            feedback_instruct_text =
                'Read through instructions too quickly.  Please take your time and make sure you understand the instructions.  Press <strong>enter</strong> to continue.'
            return true
        } else if (sumInstructTime > instructTimeThresh * 1000) {
            feedback_instruct_text =
                'Done with instructions. Press <strong>enter</strong> to continue.'
            return false
        }
    }
}

// var end_block = {
//     type: 'html-keyboard-response',
//     trial_duration: 180000,
//     data: {
//         trial_id: "end",
//         exp_id: 'digit_span'
//     },
//     stimulus: '<div class = centerbox><p class = center-block-text>You’re done with this game!<br/><br/>Press <strong>"Enter/Return"</strong> to continue.</p></div>',
//     choices: ['Enter'],
//     post_trial_gap: 0
// };

var end_block = {                                          
    type: 'image-keyboard-response',
    stimulus: 'img/trophy2.jpeg',
    prompt: '<p style = "font-size: 30px">Great job! You win another trophy! <br><br>Press <strong>"Enter/Return"</strong> to continue.</p>',
    response_ends_trial: true,
    choices: ['Enter'],
    data: {
         trial_id: "end",
         exp_id: 'digit_span'
        },
};


var start_test_block = {
    type: 'html-keyboard-response',
    stimulus: getTestText,
    data: {
        trial_id: "test_intro"
    },
    choices: jsPsych.NO_KEYS,
    stimulus_duration: 1000,
    trial_duration: 1000,
    response_ends_trial: false,
    post_trial_gap: 1000
};

var start_reverse_block = {
    type: 'html-keyboard-response',
    trial_duration: 180000,
    data: {
        trial_id: "start_reverse"
    },
    stimulus: '<div class = centerbox><p class = block-text>Now, you will see some numbers, but this time you will enter them <strong>backward</strong>.<br><br>For example, you see <strong>“1—5”</strong>, and you will enter <strong>“5—1”</strong>.<br><br><br>Press <strong>"Enter/Return"</strong> to begin.</p></div>',
    choices: ['Enter'],
    on_finish: function() {
        condition = 'practice';
        item = 0;
        trial = 0;
        item_score = 100;  // set to non-zero so first item starts
        stims = setStims()
    }
}


/* define test block */
var test_block = {
    type: 'poldrack-multi-stim-multi-response',
    stimuli: getStims,
    is_html: true,
    timing_stim: getTimeArray,
    timing_gap: gap_time,
    choices: [
        ['none']
    ],
    data: {
        trial_id: "stim",
        exp_stage: 'test'
    },
    timing_response: getTotalTime,
    timing_post_trial: 0,
    on_finish: function() {
        jsPsych.data.addDataToLastTrial({
            "sequence": curr_seq,
            "num_digits": num_digits
        })
    }
}

var forward_response_block = {
    type: 'single-stim-button',
    stimulus: response_grid,
    button_class: 'submit_button',
    data: {
        trial_id: "response",
        exp_stage: 'test'
    },
    on_finish: function() {
        jsPsych.data.addDataToLastTrial({
            "response": response.slice(),
            "sequence": curr_seq,
            "num_digits": num_digits,
            "condition": "forward"
        })
        let correct = arraysEqual(response, curr_seq);
        if(correct){
            feedback = '<span style="color:green">Correct!</span>'
        } else {
            feedback = '<span style="color:red">Incorrect</span>'
        }
        if(trial===0){
            if(correct){
                item_score = 1;
            } else {
                item_score = 0;
            }
        } else {
            if(correct){
                item_score += 1;
            }
        }
        jsPsych.data.addDataToLastTrial({
            correct: correct
        })
        response = [];
        if(trial===0){
            trial = 1;
        } else {
            trial = 0;
            item += 1;
        }
        if (item < forward_seqs[0].length) {
            setStims()
        }
    },
    timing_post_trial: 1000
}

var reverse_response_block = {
    type: 'single-stim-button',
    stimulus: response_grid,
    button_class: 'submit_button',
    data: {
        trial_id: "response",
        exp_stage: 'test'
    },
    on_finish: function() {
        jsPsych.data.addDataToLastTrial({
            "response": response.slice(),
            "sequence": curr_seq,
            "num_digits": num_digits,
            "condition": "reverse"
        })
        let correct = arraysEqual(response.reverse(), curr_seq);
        if(correct){
            feedback = '<span style="color:green">Correct!</span>'
        } else {
            feedback = '<span style="color:red">Incorrect</span>'
        }
        if(trial===0){
            if(correct){
                item_score = 1;
            } else {
                item_score = 0;
            }
        } else {
            if(correct){
                item_score += 1;
            }
        }
        jsPsych.data.addDataToLastTrial({
            correct: correct
        })
        response = [];
        if(trial===0){
            trial = 1;
        } else {
            trial = 0;
            item += 1;
        }
        if (item < reverse_seqs[0].length) {
            setStims()
        }
    },
    timing_post_trial: 1000
}

var practice_response_block = {
    type: 'single-stim-button',
    stimulus: response_grid,
    button_class: 'submit_button',
    data: {
        trial_id: "response",
        exp_stage: 'test'
    },
    on_finish: function() {
        jsPsych.data.addDataToLastTrial({
            "response": response.slice(),
            "sequence": curr_seq,
            "num_digits": num_digits,
            "condition": "practice"
        })
        let correct = arraysEqual(response.reverse(), curr_seq);
        if(correct){
            feedback = '<span style="color:green">Correct!</span>'
        } else {
            feedback = '<span style="color:red">No, you should enter "2—8".<br><br>You saw "8—2", so to enter it <strong>backward</strong>, you would press "2—8".</span>'
        }
        jsPsych.data.addDataToLastTrial({
            correct: correct
        })
        response = [];
        if(trial===0){
            trial = 1;
        } else {
            trial = 0;
            item = 0;
            condition = 'reverse';
            item_score = 100;  // set to non-zero so first item starts
        }
        setStims()
    },
    timing_post_trial: 1000
}

// var feedback_block = {
//     type: 'poldrack-single-stim',
//     stimulus: getFeedback,
//     data: {
//         trial_id: "feedback"
//     },
//     is_html: true,
//     choices: 'none',
//     timing_stim: 1000,
//     timing_response: 1000,
//     response_ends_trial: true
// }

var practice_feedback_block = {
    type: 'html-keyboard-response',
    stimulus: getFeedback,
    data: {
        trial_id: "feedback"
    },
    choices: jsPsych.NO_KEYS,
    stimulus_duration: 10000,
    trial_duration: 10000,
    response_ends_trial: true
}


let forward_item = {
    timeline: [
        start_test_block,
        test_block,
        forward_response_block,
        //feedback_block,

        start_test_block,
        test_block,
        forward_response_block,
        //feedback_block
    ],
    conditional_function: function(){
    // execute this item only if the score for the previous item > 0
    return item_score > 0;
  }
}

let reverse_item = {
    timeline: [
        start_test_block,
        test_block,
        reverse_response_block,
        //feedback_block,

        start_test_block,
        test_block,
        reverse_response_block,
        //feedback_block
    ],
    conditional_function: function(){
        // execute this item only if the score for the previous item > 0
        return item_score > 0;
    }
}

let practice_item = {
    timeline: [
        start_test_block,
        test_block,
        practice_response_block,
        practice_feedback_block,

        start_test_block,
        test_block,
        practice_response_block,
        //feedback_block
    ]
}

// pavlovia stuff
/* init connection with pavlovia.org */
var pavlovia_init = {
    type: "pavlovia",
    command: "init"
}

/* finish connection with pavlovia.org */
var pavlovia_finish = {
    type: "pavlovia",
    command: "finish",
    // Thomas Pronk; call this function when we're done with the experiment and data reception has been confirmed by Pavlovia
    completedCallback: function() {
        alert('data successfully submitted!');
    }
}

/* create experiment definition array */
var digit_span_experiment = [];
if(runat_pavlovia){
    digit_span_experiment.push(pavlovia_init);
}
digit_span_experiment.push({
    type: 'fullscreen',
    fullscreen_mode: true
});
digit_span_experiment.push(instruction_node);
for (i=0; i<forward_seqs[0].length; i++) {
    digit_span_experiment.push(forward_item)
}
//digit_span_experiment.push(attention_node)
digit_span_experiment.push(start_reverse_block)
digit_span_experiment.push(practice_item)
for (i=0; i<reverse_seqs[0].length; i++) {
    digit_span_experiment.push(reverse_item)
}
//digit_span_experiment.push(post_task_block)
digit_span_experiment.push(end_block)

if(runat_pavlovia){
    digit_span_experiment.push(pavlovia_finish);
}