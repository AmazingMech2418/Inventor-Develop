 var filename = "UNTITLED.txt";
var download = function(p1,p2) {
  var el = document.createElement("A");
  el.setAttribute("href","data:application,"+p1);
  el.setAttribute("download",p2);    
  if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      el.dispatchEvent(event);
    }
  else {
      el.click();
    }
};
var apiLib = {
    get: function (site,callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', site, true);
        xhttp.send();
    }
};
var continuelol = true;
var final = "";
var nl = `
`;
var modules = [];
function module(arr) {
var b = new Object();
  for(var i=1; i<arr.length; i+=2) {
  b[arr[i]]=arr[i+1];
  }
  modules.push(b);
}
function split(answer,splitter) {
var a = new Array();
  a.push("");
  var brackets = 0;
  for(var i=0; i<answer.length; i++) {
  if (answer[i]==='`') {
  brackets = (brackets+1)%2;
  } else if (answer[i]===splitter && brackets===0) {
  a.push("");
  } else {
  a[a.length-1]+=answer[i];
  }
  }
  return a;
}
var compiler;
function readline(line) {
var z = split(line," ");
  if (z[0]==="NEW") {
  // Create Module
    module(z);
  } else if (z[0]==="REQUIRE") {
    continuelol=false;
apiLib.get(z[1],function(data){readline(data);continuelol=true;});
  } else if (z[0]==="FILE") {
    filename = z[1];
  } else if (z[0]==="CPL") {
             compiler=z[1];
             } else if (compiler) {
               var counter = 0;
                        while (modules[counter]["NAME"]!==z[0]) {counter++;}
               var next = modules[counter][compiler];
               next=next.replace("ARG1",z[1]);
               next=next.replace("ARG2",z[2]);
               next=next.replace("ARG3",z[3]);
               next=next.replace("ARG4",z[4]);
               next=next.replace("ARG5",z[5]);
               next=next.replace("ARG6",z[6]);
               next=next.replace("ARG7",z[7]);
               next=next.replace("ARG8",z[8]);
               next=next.replace("ARG9",z[9]);
               final += next+nl;
                        }
             
}

function readOverall(code) {
var lines = code.split("|");
  var linecount = 0;
  setInterval(function() {
  if (!(linecount<lines.length)) {
     download(final,filename);
   clearInterval(this);
  }
  if(continuelol) {
  readline(lines[linecount]);
    linecount++;
  }
  },10);

}
