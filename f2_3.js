const puppeteer = require('puppeteer');

async function extractData(){
    
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
    
        await page.goto('https://github.com/trending/javascript?since=daily');
        await page.waitForSelector('.Box-row');

      //To extract repo titles
      var popular_repos=await page.evaluate(function(){
      var repoElements=Array.from(document.getElementsByClassName("h3"));
      var repos=[];
      repoElements.forEach(function (repo) {
          repos.push(repo.innerText);
      });
      return repos;
  });
    //To select await page.waitForSelector('.col-9');
    var description_repos=await page.evaluate(function(){
        var desc=Array.from(document.getElementsByClassName("col-9"));
        var description=[];
        desc.forEach(function (repo) {
            description.push(repo.innerText);
        });
        return description;
      })
      //Fetch URLs
      var url=await page.evaluate(function(){
        var urlfetch=Array.from(document.querySelectorAll(".h3 a"));
        var urlstored=[];
        urlfetch.forEach(function (repo) {
            urlstored.push(repo.innerText);
        });
        return urlstored;
      })

      //No of stars
      var stars=await page.evaluate(function(){
        var count=Array.from(document.querySelectorAll("Link--muted"));
        var starscount=[];
        count.forEach(function (repo) {
            starscount.push(repo.innerHTML);
        });
        return starscount;
      })
      console.log("Title");
      console.log(JSON.stringify(popular_repos));
      console.log("description");
      console.log(JSON.stringify(description_repos));
      console.log("Url");
      console.log(JSON.stringify(url));
      console.log("stars");
      console.log(JSON.stringify(stars));
      // await browser.close();

    };
  
extractData();