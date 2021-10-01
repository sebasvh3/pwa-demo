window.addEventListener('load', () => {
  console.log("page loaded!!");
  getData();
});

$(document).ready(() => {
  $("#btn-ajax-jquery").click(() => {
    $.ajax({ url: "/api/ajax" }).done((res) => {
      console.log("response /api/ajax", res);
    });

    $.ajax({ url: "/api/nocache" }).done((res) => {
      console.log("response /api/nocache", res);
    });

  });
});

const template = `<article>
  <img class="img-slug" src='data/img/SLUG.png' data-src='data/img/SLUG.png' alt='NAME'>
  <h3>#POS. NAME</h3>
  <ul>
  <li><span>Author:</span> <strong>AUTHOR</strong></li>
  <li><span>Twitter:</span> <a href='https://twitter.com/TWITTER'>@TWITTER</a></li>
  <li><span>Website:</span> <a href='http://WEBSITE/'>WEBSITE</a></li>
  <li><span>GitHub:</span> <a href='https://GITHUB'>GITHUB</a></li>
  <li><span>More:</span> <a href='http://js13kgames.com/entries/SLUG'>js13kgames.com/entries/SLUG</a></li>
  </ul>
</article>`;
let content = '';
for (let i = 0; i < games.length; i++) {
  let entry = template.replace(/POS/g, (i + 1))
    .replace(/SLUG/g, games[i].slug)
    .replace(/NAME/g, games[i].name)
    .replace(/AUTHOR/g, games[i].author)
    .replace(/TWITTER/g, games[i].twitter)
    .replace(/WEBSITE/g, games[i].website)
    .replace(/GITHUB/g, games[i].github);
  entry = entry.replace('<a href=\'http:///\'></a>', '-');
  content += entry;
}
document.getElementById('content').innerHTML = content;


// const button = document.getElementById('notifications');
// button.addEventListener('click', () => {
//   Notification.requestPermission().then((result) => {
//     if (result === 'granted') {
//       randomNotification();
//     }
//   });
// });

function randomNotification() {
  const randomItem = Math.floor(Math.random() * games.length);
  const notifTitle = games[randomItem].name;
  const notifBody = `Created by ${games[randomItem].author}.`;
  const notifImg = `data/img/${games[randomItem].slug}.jpg`;
  const options = {
    body: notifBody,
    icon: notifImg,
  };
  new Notification(notifTitle, options);
  setTimeout(randomNotification, 30000);
}

// fetch("https://dog.ceo/api/breeds/image/random").then(async response => {
//   console.log(response);
//   var json = await response.json();
//   console.log("response",json);
// })

if ('serviceWorker' in navigator) {
  console.log("jv register sw (NO)");
  navigator.serviceWorker.register('/jv-sw.js')
    .then(reg => console.log('SW registered!', reg))
    .catch(err => console.log('Boo!', err));
};

function getData() {
  document.querySelector("#btn-getdata").addEventListener("click", () => {
    console.log("fetch data v2");
    fetch("/data/res.json").then((res) => {
      res.json().then((j) => {
        //console.log("j", j);
        document.getElementById("div-data").innerHTML = `<table border="1">
            <thead>
            <tr><th>Valor</th></tr>
            </thead>
            <tbody>
            </tbody>
             ${Object.keys(j).map(key => (`<tr><td>${key}: ${j[key]}</td></tr>`)).join('')}
            </table>
            `;
      })
    });
  });

  document.querySelector("#btn-getdata-test").addEventListener("click", () => {
    fetch("/api/test").then(res => {
      res.json().then(j => {
        console.log("/api/test", j);
      })
    });
  });

  setTimeout(() => {
    const img = new Image();
    img.src = '/res/dog.png';
    document.getElementById("div-img").appendChild(img);
  }, 3000);

}


