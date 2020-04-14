// store participant info //
const get_info = function () {

       //set participant values	
       const studyid = 'LWPCtufb:';
       const exp_start = new Date().getTime()

       function get_start() {
           return (exp_start)
       }

       function get_studyid() {
           return (studyid)
       }

       return ({
           studyid: get_studyid,
           start: get_start,
       })

   }();

// data formatting
// creates an object class with these defaults...
// By using this everytime I store data it makes sure all data has the same formatting
function Data_row(obj) {
    // defaults
    this.studyid = get_info.studyid();
    this.exp_start = get_info.start();
    this.exp_end = "incomplete";
    this.time_start = "NA";
    this.time_end = "NA";
    this.bisbas_prompt = "NA";  
    this.bisbas_response = "NA";
    
    // transfer properties from arg to this
    for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            this[prop] = obj[prop]
        }
    };
}

//submit data
function submit_data() {
    let bisbasdata = []
    
    // collect each task dataset
    bisbasdata = bisbasdata.concat(bisbas.bisbas_array)
    
    // add exp-end time to each row
    let end_time = new Date().getTime()
    for(i = 0; i < bisbasdata.length; i++){
        bisbasdata[i].exp_end = end_time
    }
    
    // convert array of objects to string
    bisbasdata = array_to_text(bisbasdata)
	console.log(bisbasdata);
}

function array_to_text(args) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || ';';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += '"' + item[key] + '"';
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }
