/**
 * jspsych-multi-button
 * Ian Eisenberg
 *
 * plugin for displaying stimuli and getting mouse responses
 *
 * modified by Zeynep Enkavi
 * to be tested
 *
 * modified by Rob Olson for compatibility with jsPsych 6.1.0
 *
 **/
 
jsPsych.plugins["single-stim-button"] = (function() {

  var plugin = {};

  //jsPsych.pluginAPI.registerPreload('single-stim-button', 'stimulus', 'image')


	plugin.info = {
		name: 'single-stim-button',
		parameters: {
			button_class: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Button Class',
				default: undefined,
				description: 'All buttons that have this class will advance the trial and be recorded.'
			},
			response_ends_trial: {
				type: jsPsych.plugins.parameterType.BOOL,
				pretty_name: 'Response ends trial',
				default: true,
				description: 'If true, the trial ends when a response is entered.'
			},
			timing_stim: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: 'stimulus timing',
				default: -1,
				description: 'Stimulus duration.  If -1, show indefinitely'
			},
			timing_response: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: 'response timing',
				default: -1,
				description: 'Response duration.  If -1, wait for response indefinitely.'
			},
			timing_post_trial: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: 'post trial timing',
				default: 1000,
				description: 'Post-trial delay'
			},
			prompt: {
				type: jsPsych.plugins.parameterType.HTML_STRING,
				pretty_name: 'Prompt',
				default: '',
				description: 'Optional prompt to display below button'
			}
		}
	}

  plugin.trial = function(display_element, trial) {
		display_element = $(display_element);

    // // set default values for parameters
	//
	// trial.button_class = trial.button_class; //class of button to listen for. All buttons that have this class will advance the trial and be recorded
	// trial.response_ends_trial = (typeof trial.response_ends_trial === 'undefined') ? true : trial.response_ends_trial;
	// // timing parameters
	// trial.timing_stim = trial.timing_stim || -1; // if -1, then show indefinitely
	// trial.timing_response = trial.timing_response || -1; // if -1, then wait for response forever
	// trial.timing_post_trial = (typeof trial.timing_post_trial === 'undefined') ? 1000 : trial.timing_post_trial;
	// // optional parameters
	// trial.prompt = (typeof trial.prompt === 'undefined') ? "" : trial.prompt;
	//
    // // allow variables as functions
    // // this allows any trial variable to be specified as a function
    // // that will be evaluated when the trial runs. this allows users
    // // to dynamically adjust the contents of a trial as a result
    // // of other trials, among other uses. you can leave this out,
    // // but in general it should be included
    // trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

    var start_time = (new Date()).getTime();
	var response = {rt: -1, mouse: -1};
		
	// this array holds handlers from setTimeout calls
	// that need to be cleared if the trial ends early
	var setTimeoutHandlers = [];
		
	// function to end trial when it is time
	var end_trial = function() {

		// kill any remaining setTimeout handlers
		for (var i = 0; i < setTimeoutHandlers.length; i++) {
			clearTimeout(setTimeoutHandlers[i]);
		}

		//calculate stim and block duration
        if (trial.response_ends_trial) {
          if (response.rt != -1) {
            var block_duration = response.rt
          } else {
            var block_duration = trial.timing_response
          }
          if (stim_duration < block_duration & stim_duration != -1) {
            var stim_duration = trial.timing_stim
          } else {
            var stim_duration = block_duration
          }
        } else {
          var block_duration = trial.timing_response
          if (stim_duration < block_duration & stim_duration != -1) {
            var stim_duration = timing_stim
          } else {
            var stim_duration = block_duration
          }
        }
        
		// gather the data to store for the trial
		var trial_data = {
			"rt": response.rt,
			"stimulus": trial.stimuli,
			"mouse_click": response.mouse,
	        "stim_duration": stim_duration,
	        "block_duration": block_duration,
	        "timing_post_trial": trial.timing_post_trial
		};

			//jsPsych.data.write(trial_data);

		// clear the display
		display_element.html('');

		// move on to the next trial
		jsPsych.finishTrial(trial_data);
	};		
		
	// display stimulus
	display_element.append($('<div>', {
		html: trial.stimulus,
		id: 'jspsych-single-button-stimulus'
	}));

	//show prompt if there is one
	if (trial.prompt !== "") {
		display_element.append(trial.prompt);
	}
		
	//Define button press behavior
	$('.' + trial.button_class).on('click',function(){
		if(response.mouse == -1){
			var end_time = (new Date()).getTime();
			var rt = end_time - start_time;

			response.rt = rt
			if ($(this).attr('id') != undefined) {
				response.mouse = $(this).attr('id')
			} else {
				response.mouse = 'undefined_button'
			}
			$(this).addClass('responded')
			if (trial.response_ends_trial) {
				end_trial();
			}
		}
	});
		
	// hide image if timing is set
	if (trial.timing_stim > 0) {
		var t1 = setTimeout(function() {
			$('#jspsych-multi-stim-stimulus').css('visibility', 'hidden');
		}, trial.timing_stim);
		setTimeoutHandlers.push(t1);
	}

	// end trial if time limit is set
	if (trial.timing_response > 0) {
		var t2 = setTimeout(function() {
			end_trial();
		}, trial.timing_response);
		setTimeoutHandlers.push(t2);
	}
  };

  return plugin;
})();