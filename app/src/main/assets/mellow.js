/* Routing Function
 * Example:
 * route('/', 'index.html');
 */
var path = 'views';
var routes = {};

function route(path, templateId, title) {
   routes[path] = {
      templateId: templateId,
      title: title
   };
}

var view = null;

function router() {
   view = view || document.getElementById('root');
   var url = location.hash.slice(1) || '/';
   var route = routes[url];
   if (view) {
      render('root', route.templateId, route.title);
   }
}

function template(data) {
   let app = new App();
   return {
      header: app.setHeader(data)
   };
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);


/* Load Views Function 
 * This function for load and compile template
 */
function render(id, file, title = [{}]) {
   var files = file.slice((Math.max(0, file.lastIndexOf(".")) || Infinity) + 1);
   if (files == "") {
      document.getElementById(id).innerHTML = file;
   } else {
      var MellowSet = MellowSetting;
      if (MellowSet[0].maxwidth == 'auto') {
      var maxwidth = "";
      }else{
      var maxwidth = 'max-w-[' + MellowSet[0].maxwidth + ']';
      }
      if (title[0].transition == null) {
      var m_body = '<div x-data="Mellow()" class="mx-auto ' + maxwidth + '"><div class="h-full bg-gray-50">';
      } else {
      var m_body = '<div x-data="Mellow()" class="animate__animated animate__' + title[0].transition + ' animate__faster mx-auto ' + maxwidth + '"><div class="h-full bg-gray-50">';
      }
      var app = new XMLHttpRequest();
      app.open('GET', path + '/' + file, true);
      app.onreadystatechange = function () {
         if (this.readyState !== 4) return;
         if (this.status !== 200) return;
         var data = this.responseText;
         document.getElementById(id).innerHTML = data.replaceAll('{{title}}', 'test')
         .replaceAll('<m-body>', m_body)
         .replaceAll('</m-body>', '</div></div>')
         .replaceAll('<nav-mobile', '<div x-html="header"')
         .replaceAll('</nav-mobile>', '</div>')
         .replaceAll('<forEach="',  '<template x-for="')
         .replaceAll('</forEach>', '</template>')
         .replaceAll('<if="', '<template x-if="')
         .replaceAll('</if>', '</template>')
         .replaceAll('<loading-circle></loading-circle>','<center><div class="loader_mini"></div></center>');
      };
      app.send();
   }
}

String.prototype.replaceAll = function (search, replace) {
   if (replace === undefined) {
      return this.toString();
   }
   return this.split(search).join(replace);
}

function ready(func) {
   window.addEventListener('hashchange', func);
   window.addEventListener('load', func);
}

/* Template function */
class App {
   constructor() {
      this.location = location.hash.slice(1);
   }

   setParam(params, views) {
      var parameter = location.hash.split("/");
      if (parameter[1] == params && parameter[2]) {
         render('root', views);
      }
   }
   
   setTitle(name) {
      return document.title = name;
   }

   setBackground(color) {
      return document.body.style.backgroundColor = color;
   }

   setHeader(data) {
      return '<div class="relative sticky top-0 rounded-b-1xl h-9 ' + data[0].backgroundColor + ' border-b shadow p-3 pt-11 pb-10 ' + data[0].textColor + '">' +
         '<div class="mb-4 flex items-center justify-start">' +
         '<div onclick="history.back()" class="hover:text-green-500">' +
         '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
         '<polyline points="15 18 9 12 15 6"></polyline>' +
         '</svg>' +
         '</div>' +
         '<h2 class="font-medium ml-3 text-lg">' + data[0].text + '</h2>' +
         '</div>' +
         '<div class="space-y-2 text-center"></div>' +
         '</div>';
   }
}

class Http {
   constructor() {

   }
   get(id, url) {
      var app = new XMLHttpRequest();
      app.open('GET', url, true);
      app.onreadystatechange = function () {
         if (this.readyState !== 4) return;
         if (this.status !== 200) return;
         document.getElementById(id).innerHTML = this.responseText;
      };
      app.send();
   }

   post(url, params) {
      var app = new XMLHttpRequest();
      app.open('POST', url, true);
      app.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      app.onreadystatechange = function () {
         if (this.readyState !== 4) return;
         if (this.status !== 200) return;
         return this.responseText;
      };
      app.send(params);
   }
}

class Storage {

   add(key, value) {
      localStorage.setItem(key, value);
   }

   get(key) {
      return localStorage.getItem(key);
   }

   remove(key) {
      localStorage.removeItem(key);
   }
}

class Validator {

   email(mail) {
      var tag = mail.indexOf("@");
      var split = mail.lastIndexOf(".");
      if (tag < 1 || split < tag + 2 || split + 2 >= mail.length) {
         return false;
      } else {
         return true;
      }
   }

   number(num) {
      if (isNaN(num) || num < 1 || num > 10) {
         return false;
      } else {
         return true;
      }
   }

}