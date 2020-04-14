/**
 * This (and record_data.js) was coded by Nicholaus Brosowsky, https://nbrosowsky.github.io/
 *
 *   
 *
 **/

const bisbas = function () {
    let phase = 0,
        stim_time,
        submit_time,
        bisbas_array = [],
        q_names = []
    //all the bis bas questions
    let qs = [  "A person's family is the most important thing in life.",
                "Even if something bad is about to happen to me, I rarely experience fear or nervousness.",
                "I go out of my way to get things I want.",
                "When I am doing well at something I love to keep at it.",
                "I am always willing to try something new if I think it will be fun.",
                "How I dress is important to me.",
                "When I get something I want, I feel excited and energized.",
                "Criticism or scolding hurts me quite a bit.",
                "When I want something I usually go all-out to get it.",
                "I will often do things for no other reason than that they might be fun.",
                "It is hard for me to find the time to do things such as get a haircut.",
                "If I see a chance to get something I want I move on it right away.",
                "I feel pretty worried or upset when I think or know somebody is angry at me.",
                "When I see an opportunity for something I like I get excited right away.",
                "I often act on the spur of the moment.",
                "If I think something unpleasant is going to happen I usually get pretty worked up.",
                "I often wonder why people act the way they do.",
                "When good things happen to me, it affects me strongly.",
                "I feel worried when I think I have done poorly at something important.",
                "I crave excitement and new sensations.",
                "When I go after something I use a 'no holds barred' approach.",
                "I have very few fears compared to my friends.",
                "It would excite me to win a contest.",
                "I worry about making mistakes."
             ]
    //changed to be only 4 likert items & changed values
    let build = function (){
        let div = document.querySelector("#likert-list")
        for (i = 0; i < bisbas.qs.length; i++){
            let n = "bisbas-" + (i+1)
            q_names.push(n)
            
            div.innerHTML += 
                `<label class="likert-form statement"><span id="` + n + `"> ` + (i+1) + `. ` + bisbas.qs[i] + `</span></label>
                    <ul class="likert-form likert">
                    <li>
                        <input type="radio" name="` + n + `" value="1">
                        <label>1 - Very true for me</label>
                    </li>
                    <li>
                        <input type="radio" name="` + n + `" value="2">
                        <label>2 - Somewhat true for me</label>
                    </li>
                     <li>
                        <input type="radio" name="` + n + `" value="3">
                        <label>3 - Somewhat false for me</label>
                    </li>
                    <li>
                        <input type="radio" name="` + n + `" value="4">
                        <label>4 - Very false for me</label>
                    </li>
                    </ul>`
        }
        
        div.innerHTML += `<a id="dyn-bttn" class="bttn b-right f6 link dim ph3 pv2 mb2 dib white bg-green" style="width: 200px; text-align: center;">Submit Questionnaire</a>
                    <p style="color: red; text-align: center; visibility: hidden" id="incomplete">You must respond to all of the questions before moving forward</p>`
        
    }
        
    let init = function () {

        // create content display within the main-display div
        document.querySelector("#main-display").style.display = "flex"
        document.querySelector("#main-display").style.visibility = "hidden"
        
        //changed some of the instructions here
        document.querySelector("#main-display").innerHTML = 
            `<div class="content-display flex flex-column justify-center lh-copy" style="text-align: left">
                <div>
                    <p><b>You will be able to move onto the second task after you finish the questionnaire. The button to submit your responses will appear after ~4 minutes have elapsed.</b></p>
                    <p>Each item of this questionnaire is a statement that a person may either agree with or disagree with.  For each item, indicate how much you agree or disagree with what the item says.  Choose only one response to each statement.
                    </p>
                </div>
                <div class="likert-wrap">
                <form id="likert-list" action="">
                </form>
                </div>
            </div>`

        build();
        
        stim_time = window.performance.now();
        document.querySelector("#main-display").style.visibility = "visible"
		document.querySelector("#dyn-bttn").style.visibility = "hidden" //added this here so that I can add in a timer for the button 
        document.querySelector("#dyn-bttn").setAttribute("onClick", "javascript: bisbas.submit_response();")

        setTimeout(showbutton,210000); // force the submit button to only appear after 3.5 min
    }

	function showbutton(){
		document.querySelector("#dyn-bttn").style.visibility = "visible"
	}

    function submit_response() {
        let all = document.querySelectorAll("span")
        for(i = 0; i < all.length; i++){all[i].style.color = "black"}
        let v = validateResponse(q_names)
        if (!(v[0])) {
            for(i = 0; i < v[1].length; i++){
                document.querySelector("#" + v[1][i]).style.color = "red"
                                         }
            document.querySelector("#incomplete").style.visibility = "visible"
            return;
        }

        for (i = 0; i < q_names.length; i++) {
            bisbas.bisbas_array.push(new Data_row({
                bisbas_prompt: q_names[i],
                bisbas_response: document.querySelector('input[name="' + q_names[i] + '"]:checked').value,
                time_start: stim_time, //note that technically the data gathers time_start, time_end and stim_time and submit_time, but because there's only 1 questionnaire, mostly the same here.
                time_end: window.performance.now()
            }))
        }
        
        end_bisbas()
    }
    
    function end_bisbas(){
        document.querySelector("#main-display").style.display = "none"
		document.querySelector("#dyn-bttn").style.display = "none"
        
		//added this in so that it'd join together the data...
		submit_data();
		
		//and then what I need to have happen is to show the instructions from the memory phase task & reset some variable values 
        $("#ReadInstructions").show();
		$("#InstructionsHeader").show();
		$("#SCStartInstruct").show();
    }

    function validateResponse(x) {
        complete = true;
        missing = [];
        for (i = 0; i <= x.length - 1; i++) {

            if (document.querySelector('input[name="' + x[i] + '"]:checked') === null) {
                //console.log("missing " + x[i])
                missing.push(x[i])
                
                complete = false
            }

        }
        return [complete, missing]
    };

    return {
        init: init,
        submit_response: submit_response,
        bisbas_array: bisbas_array,
        qs: qs
    }
}();
