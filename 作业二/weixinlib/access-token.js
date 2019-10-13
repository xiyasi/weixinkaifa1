const titbit = require('titbit');
const gohttp=require('gohttp');
const wxkey=require('./wxkey');

var tokenurl=`https://api.weixin.qq.com/cgi-bin/token`+`?grant_type=client_credential`+`&appid=${wxkey.appid}&secret=${wxkey.secret}`;
var app = new titbit({});
  
  var {router} = app;

(async function() {
    try {
        let data = await gohttp.get(tokenurl);
        let ret = JSON.parse(data);
        if (ret.access_token === undefined) {
            throw new Error(data);
        }
        let imgcheckurl = `https://api.weixin.qq.com/wxa/img_sec_check`
            +`?access_token=${ret.access_token}`;

        ret = await gohttp.upload(imgcheckurl, {
            method : 'POST',
            files : {
                media: 't.jpg'
            }
        });

        console.log(ret);
    } catch (err) {
        console.log(err);
    }
})();

app.run(8003, 'localhost');

