//新方圆小棉袄公众号特供版
//规则编辑By香雅情。2022/05/19

//主页解析
function hikhmrule() {
    var json = JSON.parse(getResCode());
    var res = {};
    var d = [];
    var ssmd = getItem('ssmode','1');
    var ssxc = getItem('sscount','5');
    var self = JSON.parse(getRule()).title;
    //d.push({col_type: 'line'});
    var decText = getMyVar("xyqxqystext", "");
    d.push({
        title: "搜索",
        //url: "input://" + '' + ".js:putVar('ipttext',input);refreshPage()",
        //url: "'toast://你输入的是' + input",
        url: $.toString(() => {
            var link = 'hiker://empty#noRecordHistory#$$$hiker://files/rules/xyq/hikermovie.json$$$' + input + '$$$fypage$$$';
            //log(link);
            return $(link).rule(() => {
                eval(fetch('hiker://files/rules/xyq/hikermovie.js'));
                hiksearch();
            });
        }),
        extra: {
            onChange: "putMyVar('xyqxqystext',input)",
            defaultValue: decText,
            titleVisible: true
        },
        col_type: 'input'
    });

    var ssyq = ['资源网采集搜@@资源网采集.xyq', 'APP影视搜@@APP影视(P)'];
    if (self !== '香情影视') {
        d.push({
            title: self + '搜',
            url: $("#noLoading#").lazyRule(rule => 'hiker://search?s=' + getMyVar('xyqxqystext') + '&rule=' + rule, self),
            col_type: 'flex_button'
        });
    } else {
        for (var yq in ssyq) {
            var kj = ssyq[yq].split('@@');
            d.push({
                title: kj[0],
                url: $("#noLoading#").lazyRule(rule => 'hiker://search?s=' + getMyVar('xyqxqystext') + '&rule=' + rule, kj[1]),
                col_type: "flex_button"
            });
        }
    }
    d.push({
        title: '茶杯狐搜',
        url: $('hiker://empty#x#fypage@-1@#x#').rule(() => {
            var res = {};
            var d = [];
            eval(getCryptoJS());
            let tok = CryptoJS.SHA1(getMyVar('xyqxqystext') + 'URBBRGROUN').toString();
            var spl = MY_URL.split('#x#');
            var lin = 'https://api.cupfox.app/api/v2/search/?text=' + getMyVar('xyqxqystext') + '&type=0&from=' + spl[1] * 10 + '&size=20&token='+tok;
            var lint = 'https://api.cupfox.app/api/v2/search/?text=' + getMyVar('xyqxqystext') + '&type=0&from=' + spl[1] * 24 + '&size=24&token='+tok;
            var pn = spl[1] * 1 + 1;
            try {
                var urlo = JSON.parse(request(lin, {}));
                var urlt = JSON.parse(fetch(lin.replace('type=0', 'type=1'), {}));
            } catch (e) {
                var urlo = JSON.parse(request(lint, {}));
                var urlt = JSON.parse(fetch(lint.replace('type=0', 'type=1'), {}));
            } //log(urlo);
            if (urlo.resources.length < 1 && urlt.resources.length < 1) {
                d.push({
                    title: '当前关键字  ' + getMyVar('xyqxqystext') + '  无搜索结果',
                    col_type: 'text_center_1'
                });
            }
            if (urlo.resources.length > 0) {
                d.push({
                    title: '♥当前第' + pn + '页',
                    col_type: 'text_center_1'
                });

                for (var i = 0; i < urlo.resources.length; i++) {
                    var title = urlo.resources[i].text.replace(/\<.*?\>/g, '');
                    var url = urlo.resources[i].url;
                    var desc = urlo.resources[i].website;
                    d.push({
                        title: title.replace(getMyVar('xyqxqystext'), '““' + getMyVar('xyqxqystext') + '””') + '  ' + desc + '  在线',
                        url: url,
                        //desc: '在线搜索结果',
                        col_type: 'text_1'
                    });
                }
            }

            if (urlt.resources.length > 0) {
                for (var j = 0; j < urlt.resources.length; j++) {
                    var title = urlt.resources[j].text.replace(/\<.*?\>/g, '');
                    var url = urlt.resources[j].url;
                    var desc = urlt.resources[j].website;
                    d.push({
                        title: title.replace(getMyVar('xyqxqystext'), '““' + getMyVar('xyqxqystext') + '””') + '  ' + desc + '  下载',
                        url: url,
                        //desc: '下载搜索结果',
                        col_type: 'text_1'
                    });
                }
            }
            res.data = d;
            setResult(res);
        }),
        col_type: "flex_button"
    });

    var len = [];
    for (var i = 0; i < json.data.length; i++) {
        var tab = json.data[i];
        /*
        d.push({
        title : '““'+tab.type+'””',
        col_type : 'text_center_1'
        })
         */
        for (var k = 0; k < tab.list.length; k++) {
            var list = tab.list[k];
            d.push({
                title: list.title,
                img: list.ico + '@Referer=',
                url: 'hiker://empty$$' + list.url + '$$fypage$$' + list.vodtype + '$$' + list.vodhref + '$$',
                col_type: 'icon_4_card'
            })
            len.push({
                title: list.title
            });
        }
    }
    if (json.note != '') {
        d.unshift({
            title: '““' + json.note + '””' + '(' + len.length + ')',
            url: $('hiker://empty').rule((json) => {
                var res = {};
                var d = [];
                var json = json;
                d.push({
                    //title : json.note,
                    title: json.content,
                    desc: json.content,
                    url: json.uplink,
                    col_type: 'rich_text'
                });
                d.push({
                    title: '国家反诈中心推广',
                    col_type: 'text_center_1'
                });
                d.push({
                    title: '下载反诈中心',
                    pic_url: 'https://pp.myapp.com/ma_icon/0/icon_54132885_1641706635/96',
                    url: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.hicorenational.antifraud&channel=0002160650432d595942&fromcase=60001',
                    col_type: 'icon_2'
                });
                res.data = d;
                setHomeResult(res);
            }, json),
            col_type: 'scroll_button'
        });
    }
    d.unshift({
        title: '资源网',
        url: 'hiker://home@资源网采集.xyq||https://agit.ai/lzk23559/Rulehouse/raw/branch/master/资源网采集口令.txt',
        col_type: 'scroll_button'
    });

    d.unshift({
        title: 'APP影视',
        url: 'hiker://home@APP影视(P)||https://agit.ai/lzk23559/Rulehouse/raw/branch/master/APP影视口令.txt',
        col_type: 'scroll_button'
    });

    d.unshift({
        title: '🔍设置' + '(' + (ssmd == 1 ? '聚' + ssxc : '列') + ')',
        url: $('hiker://empty#noRecordHistory#').rule(() => {
            var d = [];
            var ssmd = getItem('ssmode','1');
            var ssxc = getItem('sscount','5');

            d.push({
                title: '搜索设置',
                col_type: 'text_center_1'
            });
            d.push({
                title: '当前：' + '(' + (ssmd == 1 ? '聚合结果' : '站点列表') + ')',
                url: $('hiker://empty').lazyRule(() => {
                    var md = getItem('ssmode','1');
                    if (md == 1) {
                        setItem('ssmode','0');
                        back(true);
                        return 'toast://切换为搜索引擎列表单选模式成功！';
                    } else {
                        setItem('ssmode','1')
                        back(true);
                        return 'toast://切换为聚合搜索模式成功！'
                    }
                }),
                col_type: 'text_2'
            })
            d.push({
                title: '搜索超时' + getItem('xqystmout', '3000') + '',
                url: "input://" + JSON.stringify({
                    value: "3000",
                    hint: "请设置超时时间，1000为1秒。",
                    js: $.toString(() => {
                        var num = parseInt(input).toString();
                        if (num == 'NaN' || num < 100) {
                            return 'toast://输入的值好像不正确。';
                        } else {
                            setItem('xqystmout', num);
                            refreshPage(true);
                            return 'toast://保存设置搜索超时完成！'
                        }
                    }),
                }),
                col_type: 'text_2'
            });
            d.push({
                title: '搜索线程(' + ssxc + ')',
                url: "input://" + JSON.stringify({
                    value: "5",
                    hint: "请输入一个整数数字，推荐最大不要超过15。",
                    js: $.toString(() => {
                        var num = parseInt(input).toString();
                        if (num == 'NaN' || num < 1) {
                            return 'toast://输入的值好像不正确。';
                        } else {
                            setItem('sscount',num);
                            refreshPage(true);
                            return 'toast://保存设置搜索线程完成！'
                        }
                    }),
                }),
                col_type: 'text_2'
            });
            d.push({
                title: '↓规则相关更新↓',
                col_type: 'text_center_1'
            });
            d.push({
                title: '更新网页插件',
                url: "confirm://已经不需要网页插件了，请自行从插件库删除。？.js:" + $.toString(() => {
                    return 'hiker://empty'
                }),
                desc: '已经不需要网页插件了，可以从插件库删除了。',
                col_type: 'text_center_1'
            });
            d.push({
                title: '更新规则核心文件',
                url: $('')
                .lazyRule(() => {
                    var rulejs = fetch('https://agit.ai/lzk23559/CloudRule/raw/branch/master/hikermovie.js', {});
                    if (rulejs.search(/lazyRule/) == -1) {
                        rulejs = fetch('https://codeberg.org/lzk23559/cloudrule/raw/branch/master/hikermovie.js', {});
                    }
                    if (rulejs.search(/lazyRule/) != -1) {
                        writeFile("hiker://files/rules/xyq/hikermovie.js", rulejs);
                    }
                    var rulejson = fetch('https://agit.ai/lzk23559/CloudRule/raw/branch/master/hikermovie.json', {});
                    if (rulejson.search(/\"vodhref\"/) == -1) {
                        rulejson = fetch('https://codeberg.org/lzk23559/cloudrule/raw/branch/master/hikermovie.json', {});
                    }
                    if (rulejson.search(/\"vodhref\"/) != -1) {
                        writeFile("hiker://files/rules/xyq/hikermovie.json", rulejson);
                    }
                    if (rulejs.search(/lazyRule/) != -1 && rulejson.search(/\"vodhref\"/) != -1) {
                        writeFile("hiker://files/rules/xyq/hikerupdate.txt", new Date() + '');
                        back(true);
                        return 'toast://更新文件成功。'
                    } else {
                        return 'toast://更新失败。'
                    }
                }),
                desc: '香情影视核心文件，点击可及时同步云端文件，说不定有些问题被解决了。',
                col_type: 'text_center_1'
            });

            setResult(d)
        }),
        col_type: 'scroll_button'
    })

    res.data = d;
    setHomeResult(res);
}
//主页二级
function hikhmerj() {
    var res = {};
    var d = [];
    var spl = MY_URL.split('$$')[1];
    var pn = MY_URL.split('$$')[2];
    var vtype = MY_URL.split('$$')[3];
    var vhref = MY_URL.split('$$')[4];
    //var cook=getVar('hikernfcookie');

    try {
        //第一页要显示分类
        if (pn == 1) {
            //分类标题与替换词
            var clst = vtype.split('&');
            var clsu = vhref.split('&');

            for (var i = 0; i < clst.length; i++) {
                //分类链接
                if (/ysgc|tkznp|ak1080|tegouys|gfysys|fositv/.test(spl)) {
                    var url = spl + '/vodtype/' + clsu[i] + '-fypage.html';
                } else if (/zhenbuka|ikandy|cokemv|renrenmi/.test(spl)) {
                    var url = spl + '/vodtype/' + clsu[i] + '-fypage/';
                } else if (/jpys|dsxys|vipmv|haokanju|guapi|555movie|dami10|newfii|netflix|4kcz|1090ys|lekkan/.test(spl)) {
                    var url = spl + '/vodshow/' + clsu[i] + '--------fypage---.html';
                } else if (/miniku|1080p/.test(spl)) {
                    var url = spl + '/vodshow/' + clsu[i] + '--------fypage---/';
                } else if (/dianyi\.ng/.test(spl)) {
                    var url = spl + '/pianku-' + clsu[i] + '--------fypage---.html';
                } else if (/9eguoyu/.test(spl)) {
                    var url = spl + '/vodshow/' + clsu[i] + '/page/fypage.html';
                } else if (/fantuanhd|citydy/.test(spl)) {
                    var url = spl + '/type/id-'+clsu[i]+'-fypage.html';
                } else if (/xmaomi/.test(spl)) {
                    var url = spl + '/vod_____show/'+clsu[i]+'--------fypage---.html';
                } else if (/saohuo|zxzj/.test(spl)) {
                    var url = spl + '/list/' + clsu[i] + '-fypage.html';
                } else if (/lezhutv|libvio/.test(spl)) {
                    var url = spl + '/type/' + clsu[i] + '-fypage.html';
                } else if (/dm84/.test(spl)) {
                    var url = spl + '/list-' + clsu[i] + '-fypage.html';
                } else if (/czspp|magedn|subaibai|nfyingshi/.test(spl)) {
                    var url = spl + '/' + clsu[i] + '/page/fypage[firstPage=' + spl + '/' + clsu[i] + ']';
                } else if (/auete/.test(spl)) {
                    var url = spl + '/' + clsu[i] + '/indexfypage.html[firstPage=' + spl + '/' + clsu[i] + '/index.html]';
                } else if (/1231d|smdyy/.test(spl)) {
                    var url = spl + '/show/' + clsu[i] + '--------fypage---.html';
                } else if (/tvyb0/.test(spl)) {
                    var url = spl + '/vod/type/id/' + clsu[i] + '/page/fypage.html';
                } else if (/qkan8|unss/.test(spl)) {
                    var url = spl + '/index.php/vod/type/id/' + clsu[i] + '/page/fypage.html';
                } else if (/ikuwoo|aiyy/.test(spl)) {
                    var url = spl + '/index.php/vod/show/id/' + clsu[i] + '/page/fypage.html';
                } else if (/xifanys/.test(spl)) {
                    var url = spl + '/yingpianshow/'+clsu[i]+'--------fypage---.html';
                } else if (/kunyu77/.test(spl)) {
                    var url = spl + '/searchFilter?type_id=' + clsu[i] + '&pagenum=fypage&pagesize=24;get;utf-8;{User-Agent@Dalvik/2.1.0}';
                } else if (/juhuang/.test(spl)) {
                    var url = spl + '/type/' + clsu[i] + '_type_fypage.html[firstPage=' + spl + '/type/' + clsu[i] + '_type.html]';
                } else if (/kanju77/.test(spl)) {
                    var url = spl + '/ve/' + clsu[i] + '-fypage/';
                } else if (/kkju/.test(spl)) {
                    var url = spl + '/show/'+clsu[i]+'---/page/fypage.html'
                } else if (/fenggou/.test(spl)) {
                    var url = spl + '/list-select-id-'+clsu[i]+'-type--area--year--star--state--order--p-fypage.html'
                }

                //显示分类
                d.push({
                    title: clst[i],
                    url: url + `@rule=js:eval(fetch('hiker://files/rules/xyq/hikermovie.js'));clsrule();`,
                    col_type: clst.length >= 16 ? 'scroll_button' : 'flex_button'
                    //col_type:'flex_button'
                })
            } //for结束

            //分类结束
            d.push({
                col_type: 'line'
            });
        }

        //取主页源码
        //主页支持翻页的
        if (/renrenmi/.test(spl)) {
            var link = spl + '/index-' + pn + '/';
            var html = fetch(link, {
                headers: {
                    'User-Agent': MOBILE_UA,
                    'Referer': spl
                }
            });
        } else if (/kunyu77/.test(spl)) {
            var html = fetch(spl + '/searchFilter?type_id=0&pagenum=' + pn + '&pagesize=24', {
                headers: {
                    'User-Agent': 'Dalvik/2.1.0'
                }
            });
        } else {
            if (pn == 1) {
                //通用取源码
                var html = request(spl, {});
            }
        }
        if (html.indexOf('检测中') != -1) {
            let cook = JSON.parse(fetchCookie(spl, {
                        headers: {
                            "User-Agent": MOBILE_UA
                        }
                    })).join(';');
            html = fetch(spl + '/?btwaf' + html.match(/btwaf(.*?)\"/)[1], {
                headers: {
                    "User-Agent": MOBILE_UA,
                    "Cookie": cook
                }
            });
        } else if (html.indexOf('人机身份验证，请完成以下操作') > -1) {
            eval(getItem('huadong').replace(/refre/g, spl));
            var html = fetch(spl, {
                headers: {
                    "User-Agent": MOBILE_UA,
                    "Cookie": cok,
                    "Referer": spl
                }
            });
        };
        //setError(html);
        //首页推荐开始,取首页推荐列表
        if (/kunyu77/.test(spl)) {
            var conts = '[]';
        } else if (/class\=\"v_list/.test(html)) {
            var conts = pdfa(html, 'body&&.v_list');
        } else if (/czspp|magedn|subaibai|nfyingshi/.test(spl)) {
            var conts = pdfa(html, 'body&&.bt_img');
        } else if (/mo-part-round/.test(html) && /mo-situ-name/.test(html)) {
            var conts = pdfa(html, 'body&&.mo-part-round:has(.mo-situ-name)');
        } else if (/mo-main-foot/.test(html) && /mo-list-wrap/.test(html)) {
            var conts = pdfa(html, 'body&&.mo-list-wrap:has(.mo-lazy-play)');
        } else if (/menuBar/.test(html) && /imgBox/.test(html)) {
            var conts = pdfa(html, 'body&&.imgBox:has(.ImgA)');
        } else if (/myui-vodlist/.test(html) && /pic-text/.test(html)) {
            var conts = pdfa(html, 'body&&.myui-vodlist:has(.pic-text)');
        } else if (/myui-vodlist/.test(html) && /pic-tag/.test(html)) {
            var conts = pdfa(html, 'body&&.myui-vodlist:has(.pic-tag)');
        } else if (/stui-vodlist/.test(html) && /stui-vodlist__detail|stui-vodlist__title/.test(html)) {
            var conts = pdfa(html, 'body&&.stui-vodlist');
        } else if (/stui-vodlist/.test(html) && /class\=\"text-red/.test(html)) {
            var conts = pdfa(html, 'body&&.stui-vodlist');
        } else if (/vodlist/.test(html) && /vodlist_item/.test(html)) {
            var conts = pdfa(html, 'body&&.vodlist:has(.vodlist_item)');
        } else if (/pack-packcover/.test(html)) {
            var conts = pdfa(html, 'body&&.vodlist:has(.pack-packcover)');
        } else if (/fed-list-info/.test(html) && /fed-col-sm3/.test(html)) {
            var conts = pdfa(html, 'body&&.fed-list-info:has(.fed-col-sm3)');
        } else if (/list-unstyled/.test(html) && /col-sm-3/.test(html)) {
            var conts = pdfa(html, 'body&&.list-unstyled:has(.col-sm-3)');
        } else if (/list-unstyled/.test(html) && /col-xs-4/.test(html)) {
            var conts = pdfa(html, 'body&&.list-unstyled:has(.col-xs-4)');
        } else if (/hy-video-list/.test(html) && /col-sm-3/.test(html)) {
            var conts = pdfa(html, 'body&&.hy-video-list:has(.col-sm-3)');
        } else if (/hl-vod-list/.test(html) && /hl-list-item/.test(html)) {
            var conts = pdfa(html, 'body&&.hl-vod-list:has(.hl-list-item)');
        } else if (/layout-box/.test(html) && /col-sm-3/.test(html)) {
            var conts = pdfa(html, 'body&&.layout-box:has(.col-sm-3)');
        } else if (/forum_card_fid/.test(html) && /threadlist/.test(html)) {
            var conts = pdfa(html, 'body&&.threadlist');
        } else if (/index-area/.test(html) && /link-hover/.test(html) && /sj-nav-search|sy-nav-search/.test(html)) {
            var conts = pdfa(html, 'body&&.index-area');
        } else if (/indexShowBox/.test(html) && /video-model-list/.test(html)) {
            var conts = pdfa(html, 'body&&.video-model-list');
        } else if (/module-item/.test(html) && /module-list/.test(html)) {
            var conts = pdfa(html, 'body&&.module-list');
        } else if (/module-items/.test(html) && /module-poster-item-info/.test(html)) {
            var conts = pdfa(html, 'body&&.module-items');
        } else if (/movie-list/.test(html) && /m-item/.test(html)) {
            var conts = pdfa(html, 'body&&.movie-list');
        } else if (/data_list/.test(html) && /DianDian/.test(html)) {
            var conts = pdfa(html, 'body&&#data_list');
        } else if (/tbox_t/.test(html) && /tbox_m2/.test(html)) {
            var conts = pdfa(html, 'body&&.tbox_m2');
        } else if (/tbox_t/.test(html) && /tbox_m/.test(html)) {
            var conts = pdfa(html, 'body&&.tbox_m');
        } else if (/volistheightb/.test(html) && /volistwidthb/.test(html)) {
            var conts = pdfa(html, 'body&&.box:has(.volistwidthb)');
        }

        //setError(conts);
        for (var i = 0; i < conts.length; i++) {
            //主页片单列表
            if (/kunyu77/.test(spl)) {
                var list = JSON.parse(html).data.result;
            } else if (html.indexOf('mo-part-round') != -1) {
                var list = pdfa(conts[i], 'body&&.mo-cols-info');
            } else if (/hy-video-list/.test(html) && /col-sm-3/.test(html)) {
                var list = pdfa(conts[i], 'body&&.col-sm-3');
            } else if (/hl-vod-list/.test(html) && /hl-list-item/.test(html)) {
                var list = pdfa(conts[i], 'body&&.hl-list-item');
            } else if (/layout-box/.test(html) && /col-sm-3/.test(html)) {
                var list = pdfa(conts[i], 'body&&.col-sm-3');
            } else if (html.indexOf('fed-list-info') != -1) {
                var list = pdfa(conts[i], 'body&&.fed-col-sm3');
            } else if (html.indexOf('pack-packcover') != -1) {
                var list = pdfa(conts[i], 'body&&.pack-packcover');
            } else if (/module-item/.test(html) && /module-list/.test(html)) {
                var list = pdfa(conts[i], 'body&&.module-item');
            } else if (/module-items/.test(html) && /module-poster-item-info/.test(html)) {
                var list = pdfa(conts[i], 'body&&.module-item');
            } else if (/data_list/.test(html) && /DianDian/.test(html)) {
                var list = pdfa(html, 'body&&#data_list&&.DianDian');
            } else if (html.indexOf('link-hover') != -1) {
                var list = pdfa(conts[i], 'body&&li:has(.link-hover)');
            } else {
                var list = pdfa(conts[i], 'body&&li:has(a)')
            }

            //setError(list);

            for (var j = 0; j < list.length; j++) {
                //图片
                try {
                    if (/auete/.test(spl)) {
                        var img = pdfh(list[j], 'img&&src');
                    } else if (/kunyu77/.test(spl)) {
                        var img = list[j].videoCover;
                    } else if (/module-list/.test(html) && /module-item/.test(html)) {
                        var img = pdfh(list[j], ".lazyloaded||.lazyload||.lazy&&data-src||data-original");
                    } else if (/vbox_t/.test(html) && /vbox/.test(html)) {
                        var img = pdfh(list[j], "a&&style||data-original");
                    } else if (/data-background/.test(list[j]) && /swiper-lazy/.test(list[j])) {
                        var img = pdfh(list[j], "a&&data-background");
                    } else {
                        var img = pdfh(list[j], '.lazy||.lazyload||.lazyloaded||.mo-situ-pics||.mo-lazy-load||.myui-vodlist__thumb||.fed-list-pics||.img-responsive||.eclazy||.video-pic||.hl-lazy||.leo-lazy&&data-original||style||data-src||data-bg');
                    }
                    if (img.substring(0, 4) == 'http') {
                        img = img;
                    } else {
                        img = spl + img
                    }
                } catch (e) {}

                //描述
            try{
                if (/class="jidi"|class="hdinfo"|class="qr"/.test(list[j])) {
                    var desc = pdfh(list[j], '.jidi||.hdinfo||.qr&&Text');
                } else if (/leo-video-remark/.test(list[j]) && /leo-video-(\S*?)item/.test(list[i])) {
                    var desc = pdfh(list[j], '.leo-video-remark&&Text');
                } else if (/class="type"|class="time"/.test(list[j])) {
                    var typ = pdfh(list[j], '.type&&Text');
                    var tim = pdfh(list[j], '.time&&Text');
                    var desc = typ + ' ' + tim;
                } else if (/kunyu77/.test(spl)) {
                    var desc = list[j].msg;
                } else if (/module-item-text/.test(list[j]) && /module-item-caption/.test(list[j])) {
                    var desc = pdfh(list[j], '.module-item-text&&Text');
                } else if (/mo-lazy-wind/.test(list[j]) && /dc-west/.test(list[j])) {
                    var desc = pdfh(list[j], '.dc-west&&Text');
                } else {
                    var desc = pdfh(list[j], '.pic-text||.pic_text||.mo-situ-rema||.fed-list-remarks||.continu||.anime_icon1_name1||.v_note||.pack-prb||.note||.pic-tag-left||.hl-pic-text||.hdtag||.tag-mark||.other||.zhuangtai||.module-item-text||.module-item-caption||.module-item-note||.list-remarks||span&&Text')
                }
             } catch (e) {}
                //标题
                if (/czspp|magedn|subaibai|nfyingshi|renrenmi/.test(spl)) {
                    var title = pdfh(list[j], 'h3&&Text');
                } else if (/kunyu77/.test(spl)) {
                    var title = list[j].title;
                } else if (/mo-situ-name/.test(list[j])) {
                    var title = pdfh(list[j], '.mo-situ-name&&Text');
                } else if (/txtA/.test(list[j])) {
                    var title = pdfh(list[j], '.txtA&&Text');
                } else if (/txt-area/.test(list[j])) {
                    var title = pdfh(list[j], '.txt-area&&a&&Text');
                } else if (/fed-list-title/.test(list[j])) {
                    var title = pdfh(list[j], '.fed-list-title&&Text');
                } else if (/video-model-title/.test(list[j])) {
                    var title = pdfh(list[j], '.video-model-title&&Text');
                } else if (/ff-text-right|anime_icon1_name|zoomOverlay|mo-lazy-wind/.test(list[j])) {
                    var title = pdfh(list[j], 'img&&alt');
                } else {
                    var title = pdfh(list[j], 'a&&title')
                }

                //链接
                if (/kunyu77/.test(spl)) {
                    var url = 'hiker://empty##'+spl+'##' + list[j].id;
                } else if (/hgyx/.test(spl)) {
                    var zykurl = pdfh(list[j], "a&&href");
                    var url = spl + zykurl.replace('/detail/', '/play/').replace('.html', '/sid/1/nid/1.html');
                } else if (/hdinfo/.test(list[j])) {
                    var url = pdfh(list[j], 'h3&&a&&href');
                } else {
                    var url = pdfh(list[j], 'a&&href')
                }

                //首页无图的
                if (!img) {
                    d.push({
                        title: title,
                        url: ((url.substring(0, 4) == 'http'||url.substring(0, 4) == 'hike') ? url : spl + url) + `@rule=js:eval(fetch('hiker://files/rules/xyq/hikermovie.js'));omerj();`,
                        desc: desc,
                        col_type: 'text_center_1'
                    });
                }
                //首页有图的
                else {
                    if (/imgdb/.test(img)) {
                        var tup = img + '@Referer=';
                    } else if (/cocomanga/.test(spl)) {
                        var tup = img + '@Referer=' + spl + '@User-Agent=' + MOBILE_UA;
                    } else if (/look4you/.test(img)) {
                        var tup = img + '@Referer=' + spl;
                    } else {
                        var tup = img + '@Referer=' + img
                    }
                    d.push({
                        title: title,
                        url: ((url.substring(0, 4) == 'http'||url.substring(0, 4) == 'hike') ? url : spl + url) + `@rule=js:eval(fetch('hiker://files/rules/xyq/hikermovie.js'));omerj();`,
                        pic_url: tup,
                        desc: desc,
                        col_type: 'movie_3_marquee'
                    });
                }

            } //for j
        } //for i
    } catch (e) {}
    res.data = d;
    setHomeResult(res);

}

//分类规则函数
function clsrule() {
    var res = {};
    var d = [];
    var html = getResCode();
    //过宝塔检测
    if (html.indexOf('检测中') != -1) {
        let cook = JSON.parse(fetchCookie(MY_URL, {
                    headers: {
                        "User-Agent": MOBILE_UA
                    }
                })).join(';');
        html = fetch(MY_URL + '?btwaf' + html.match(/btwaf(.*?)\"/)[1], {
            headers: {
                "User-Agent": MOBILE_UA,
                "Cookie": cook
            }
        });
    };
    //setError(html);

    var spl = MY_URL.match(/([\S]*?:\/\/[\S]*?)\//)[1];
    if (html.indexOf('人机身份验证，请完成以下操作') > -1) {
        eval(getItem('huadong').replace(/refre/g, spl));
        var html = fetch(MY_URL, {
            headers: {
                "User-Agent": MOBILE_UA,
                "Cookie": cok,
                "Referer": spl
            }
        });
    };
    //取分类片单列表
    if (/kunyu77/.test(MY_URL)) {
        var list = JSON.parse(html).data.result;
    } else if (/czspp|magedn|subaibai|nfyingshi/.test(MY_URL)) {
        var list = pdfa(html, '.bt_img&&li');
    } else if (/myui-vodlist/.test(html) && /pic-tag|pic-text/.test(html)) {
        var list = pdfa(html, ".myui-vodlist&&li:has(a)");
    } else if (/stui-vodlist/.test(html) && /pic-text|pic-tag|<\/em>/.test(html)) {
        var list = pdfa(html, ".stui-vodlist&&li:has(a)");
    } else if (/stui-vodlist/.test(html) && /stui-vodlist__detail/.test(html)) {
        var list = pdfa(html, ".stui-vodlist&&li:has(a)");
    } else if (/vodlist/.test(html) && /pack-ykpack/.test(html)) {
        var list = pdfa(html, '.vodlist&&.pack-ykpack');
    } else if (/vodlist/.test(html) && /vodlist_item/.test(html)) {
        var list = pdfa(html, ".vodlist&&li");
    } else if (/mo-part-round/.test(html) && /mo-situ-name/.test(html)) {
        var list = pdfa(html, 'body&&.mo-part-round:has(.mo-situ-name)&&.mo-cols-info');
    } else if (/mo-main-foot/.test(html) && /mo-list-wrap/.test(html)) {
        var list = pdfa(html, 'body&&.mo-list-wrap:has(.mo-lazy-play)&&li');
    } else if (/fed-list-info/.test(html)) {
        var list = pdfa(html, '.fed-list-info&&li');
    } else if (/list-unstyled/.test(html)) {
        var list = pdfa(html, '.list-unstyled:has(.continu)&&li');
    } else if (/row-cards/.test(html) && /card-link/.test(html)) {
        var list = pdfa(html, '.row-cards&&.card');
    } else if (/cards/.test(html) && /card/.test(html)) {
        var list = pdfa(html, '.cards&&.card');
    } else if (/class\=\"v_list/.test(html)) {
        var list = pdfa(html, '.v_list&&li:has(a)');
    } else if (/leo-video-item/.test(html)) {
        var list = pdfa(html, 'body&&.leo-video-item');
    } else if (/hy-video-list/.test(html) && /col-sm-3/.test(html)) {
        var list = pdfa(html, '.hy-video-list&&.col-sm-3');
    } else if (/hl-vod-list/.test(html) && /hl-list-item/.test(html)) {
        var list = pdfa(html, '.hl-vod-list&&.hl-list-item');
    } else if (/box-video-list/.test(html) && /col-sm-3/.test(html)) {
        var list = pdfa(html, '.box-video-list&&.col-sm-3');
    } else if (/forum_card_fid/.test(html) && /threadlist/.test(html)) {
        var list = pdfa(html, 'body&&.threadlist&&li');
    } else if (/index-area/.test(html) && /link-hover/.test(html)) {
        var list = pdfa(html, 'body&&.main&&li:has(.link-hover)');
    } else if (/search-class-list-common/.test(html) && /search-class-list-li/.test(html)) {
        var list = pdfa(html, 'body&&.search-class-list-common&&li');
    } else if (/module-list/.test(html) && /module-item/.test(html)) {
        var list = pdfa(html, 'body&&.module-item');
    } else if (/module-items/.test(html) && /module-poster-item-info/.test(html)) {
        var list = pdfa(html, '.module-items&&a');
    } else if (/module-class-items/.test(html) && /module-poster-item/.test(html)) {
        var list = pdfa(html, 'body&&.module-item');
    } else if (/menuBar/.test(html) && /movie-item/.test(html)) {
        var list = pdfa(html, 'body&&.movie-item');
    } else if (/data_list/.test(html) && /DianDian/.test(html)) {
        var list = pdfa(html, 'body&&#data_list&&.DianDian');
    } else if (/tbox_m2/.test(html) && /tbox_t/.test(html)) {
        var list = pdfa(html, 'body&&.tbox_m2&&li');
    } else if (/tbox_m/.test(html) && /tbox_t/.test(html)) {
        var list = pdfa(html, 'body&&.tbox_m&&li');
    } else if (/vod_list/.test(html) && /common-action/.test(html)) {
        var list = pdfa(html, 'body&&#vod_list&&li');
    } else if (/volistheightb/.test(html) && /volistwidthb/.test(html)) {
        var list = pdfa(html, 'body&&.volistwidthb');
    }
    //setError(list.length);

    for (var i = 0; i < list.length; i++) {
        //图片
        try {
            if (/auete/.test(MY_URL)) {
                var img = pdfh(list[i], 'img&&src');
            } else if (/kunyu77/.test(MY_URL)) {
                var img = list[i].videoCover;
            } else if (/module-list/.test(html) && /module-item/.test(html)) {
                var img = pdfh(list[i], ".lazyloaded||.lazyload||.lazy&&data-src||data-original");
            } else if (/vbox/.test(list[i]) && /vbox_t/.test(list[i])) {
                var img = pdfh(list[i], "a&&style||data-original");
            } else {
                var img = pd(list[i], '.lazy||.lazyload||.lazyloaded||.mo-situ-pics||.mo-lazy-load||.fed-list-pics||.img-responsive||.eclazy||.video-pic||.hl-lazy||.leo-lazy&&data-original||data-src||data-bg');
            }
            if (img.substring(0, 4) == 'http') {
                img = img;
            } else {
                img = spl + img
            }
        } catch (e) {}

        //描述
        try {
            if (/class="jidi"|class="hdinfo"|class="qr"/.test(list[i])) {
                var desc = pdfh(list[i], '.jidi||.hdinfo||.qr&&Text');
            } else if (/kunyu77/.test(MY_URL)) {
                var desc = list[i].msg;
            } else if (/class="type"|class="time"/.test(list[i])) {
                var typ = pdfh(list[i], '.type&&Text');
                var tim = pdfh(list[i], '.time&&Text');
                var desc = typ + ' ' + tim;
            } else if (/module-item-text/.test(list[i]) && /module-item-caption/.test(list[i])) {
                var desc = pdfh(list[i], '.module-item-text&&Text');
            } else if (/mo-lazy-wind/.test(list[i]) && /dc-west/.test(list[i])) {
                var desc = pdfh(list[i], '.dc-west&&Text');
            } else {
                var desc = pdfh(list[i], '.pic-text||.pic_text||.mo-situ-rema||.fed-list-remarks||.continu||.newname||.v_note||.pack-prb||.note||.pic-tag-left||.hl-pic-text||.hdtag||.other||.zhuangtai||.module-item-text||.module-item-caption||.module-item-note||.list-remarks||span&&Text');
            }
        } catch (e) {}

        //标题
        if (/czspp|magedn|subaibai|nfyingshi|renrenmi/.test(MY_URL)) {
            var title = pdfh(list[i], "h3&&Text");
        } else if (/kunyu77/.test(MY_URL)) {
            var title = list[i].title;
        } else if (/mo-situ-name/.test(list[i])) {
            var title = pdfh(list[i], '.mo-situ-name&&Text');
        } else if (/fed-list-title/.test(list[i])) {
            var title = pdfh(list[i], '.fed-list-title&&Text');
        } else if (/ff-text-right|cell_imform|zoomOverlay|mo-lazy-wind/.test(list[i])) {
            var title = pdfh(list[i], 'img&&alt');
        } else if (/video-model-title/.test(list[i])) {
            var title = pdfh(list[i], '.video-model-title&&Text');
        } else if (/txtA/.test(list[i])) {
            var title = pdfh(list[i], '.txtA&&Text');
        } else {
            var title = pdfh(list[i], 'a&&title');
        }

        //链接
        if (/kunyu77/.test(MY_URL)) {
            //var url = 'http://api.kunyu77.com/api.php/provide/videoPlaylist?ids=' + list[i].id;
            var url = 'hiker://empty##'+spl+'##' + list[i].id;
        } else if (/hgyx/.test(spl)) {
            var zykurl = pdfh(list[i], "a&&href");
            var url = spl + zykurl.replace('/detail/', '/play/').replace('.html', '/sid/1/nid/1.html');
        } else {
            var url = pd(list[i], 'a&&href');
        }

        //分类片单无图的
        if (!img) {
            d.push({
                title: title,
                url: ((url.substring(0, 4) == 'http'||url.substring(0, 4) == 'hike') ? url : spl + url) + `@rule=js:eval(fetch('hiker://files/rules/xyq/hikermovie.js'));omerj();`,
                desc: desc,
                col_type: 'text_center_1'
            });
        }
        //分类片单有图的
        else {
            if (/imgdb/.test(img)) {
                var tup = img + '@Referer=';
            } else if (/cocomanga/.test(spl)) {
                var tup = img + '@Referer=' + spl + '@User-Agent=' + MOBILE_UA;
            } else if (/look4you/.test(img)) {
                var tup = img + '@Referer=' + spl;
            } else {
                var tup = img + '@Referer=' + img
            }
            d.push({
                title: title,
                pic_url: tup,
                desc: desc,
                url: ((url.substring(0, 4) == 'http'||url.substring(0, 4) == 'hike') ? url : spl + url) + `@rule=js:eval(fetch('hiker://files/rules/xyq/hikermovie.js'));omerj();`,
                col_type: 'movie_3_marquee'
            });
        }

    }
    res.data = d;
    setHomeResult(res);

}

//搜索解析规则函数
function hiksearch() {
    var urlph = $.toString(() => {
        //rss接口
        /*if (/98bbw/.test(url)) {
            url = url + '/index.php/rss/index.xml?wd=' + spl[2];
        }
        //suggest接口
        else */if (url.search(/jpys|yingkuya|9eguoyu|smdyy/) != -1) {
            url = url + '/index.php/ajax/suggest?mid=1&wd=' + spl[2] + '&limit=50';
        } else if (/555movie|dami10|ysgc|cokemv|haokanju|guapi|4kcz|newfii|netflix|ak1080|1090ys|zxzj|gfysys|fositv/.test(url)) {
            url = url + '/vodsearch/' + spl[2] + '----------fypage---.html';
        } else if (/zhenbuka|ikandy|lekkan|yingkuya|miniku|renrenmi|1080p/.test(url)) {
            url = url + '/vodsearch/' + spl[2] + '----------fypage---/';
        } else if (/tkznp|tegouys/.test(url)) {
            url = url + '/vodsearch/page/fypage/wd/' + spl[2] + '.html';
        } else if (/xifanys/.test(url)) {
            url = url + '/yingpiansearch/'+spl[2]+'----------fypage---.html';
        } else if (/juhuang/.test(url)) {
            url = 'https://so.juhuang.tv/soapi.php?wd=' + spl[2];
        } else if (/dianyi\.ng/.test(url)) {
            url = url + '/search-' + spl[2] + '----------fypage---.html';
        } else if (/libvio/.test(url)) {
            url = url + '/search/'+spl[2]+'----------fypage---.html';
        } else if (/magedn|nfyingshi/.test(url)) {
            url = url + '/page/fypage?s=' + spl[2];
        } else if (/czspp/.test(url)) {
            url = url + '/xssearch?q=' + spl[2] + '&f=_all&p=fypage';
        } else if (/subaibai/.test(url)) {
            url = url + '/grabble?q=' + spl[2] + '&f=_all&p=fypage';
        } else if (/dm84/.test(url)) {
            url = url + '/s-' + spl[2] + '---------fypage.html';
        } else if (/tvyb0|vipmv|9eguoyu/.test(url)) {
            url = url + '/vod/search/page/fypage/wd/' + spl[2] + '.html';
        } else if (/smdyy|fantuanhd|citydy/.test(url)) {
            url = url + '/search/page/fypage/wd/' + spl[2] + '.html';
        } else if (/qkan8|ikuwoo|unss|aiyy/.test(url)) {
            url = url + '/index.php/vod/search/page/fypage/wd/' + spl[2] + '.html';
        } else if (/dsxys/.test(url)) {
            url = url + '/sb/ke7nhZe3c1' + spl[2] + '-/page/fypage.html';
        } else if (/saohuo/.test(url)) {
            url = url + '/search.php?page=fypage&searchword=' + spl[2] + '&searchtype=';
        } else if (/lezhutv/.test(url)) {
            url = url + '/search-pg-fypage-wd-' + spl[2] + '.html';
        } else if (/auete/.test(url)) {
            url = url + '/search.php?searchword=' + spl[2];
        } else if (/kunyu77/.test(url)) {
            url = url + '/searchVideo?searchName=' + spl[2] + '&pg=fypage';
        } else if (/kanju77/.test(url)) {
            url = url + '/vh/' + spl[2] + '----------fypage---/';
        } else if (/kkju/.test(url)) {
            url = url+'/so/page/fypage/wd/'+spl[2]+'.html';
        } else if (/xmaomi/.test(url)) {
            url = url+'/v_search/'+spl[2]+'----------fypage---.html';
        } else if (/fenggou/.test(url)) {
            url = url+'/vod-search-wd-'+spl[2]+'-p-fypage.html';
        }
    });
    //代码开始
    var res = {};
    var d = [];
    var spl = MY_URL.split('$$$');
    var json = JSON.parse(fetch(spl[1], {}));
    var ssmd = getItem('ssmode','1');
    if (ssmd == '1' || MY_TYPE == "home") {
        for (var i = 0; i < json.data.length; i++) {
            var tabs = json.data[i].type;
            var list = json.data[i].list;
            d.push({
                title: " 点击此处开始 ““" + spl[2] + "”” 聚合搜索",
                url: $('hiker://empty#noRecordHistory#$$$hiker://files/rules/xyq/hikermovie.js$$$' + spl[2] + '$$$fypage').rule((list, ssmd, urlph) => {
                    var items = [];
                    var spl = MY_URL.split('$$$');
                    var ssxc = getItem('sscount','5');
                    var tout = getItem('xqystmout', '3000');
                    var num = spl[3];
                    var le = num * ssxc;
                    var Data = [];
                    var Tit = [];
                    let pageid = "__xqys" + num;
                    try {
                        for (var j = le - ssxc; j < le; j++) {
                            if (j < list.length) {
                                var title = list[j].title;
                                var url = list[j].url;
                                eval(urlph);
                                var Url = url.replace('fypage', '1');
                                if (/kunyu77/.test(Url)) {
                                    Data.push({
                                        url: Url,
                                        options: {
                                            headers: {
                                                "User-Agent": 'okhttp/3.12.0'
                                            },
                                            timeout: tout
                                        }
                                    });
                                } else if (/555movie|dami10/.test(Url)) {
                                    Data.push({
                                        url: Url,
                                        options: {
                                            headers: {
                                                "User-Agent": MOBILE_UA,
                                                "Cookie": "searchneed=ok"
                                            },
                                            timeout: tout
                                        }
                                    });
                                } else if (/tvyb|saohuo|zhenbuka|cokemv|ysgc|kanju77|guapi|ak1080|tkznp|tegouys/.test(Url)) {
                                    //需要带cookie的
                                    Data.push({
                                        url: Url,
                                        options: {
                                            headers: {
                                                "User-Agent": MOBILE_UA,
                                                "Cookie": fetch("hiker://files/rules/xyq/xqyscookie/" + title + "cookie.txt", {})
                                            }
                                        }
                                    });
                                } else {
                                    Data.push({
                                        url: Url,
                                        options: {
                                            headers: {
                                                "User-Agent": MOBILE_UA
                                            },
                                            timeout: tout
                                        }
                                    });
                                };
                                Tit.push({
                                    tit: title
                                });
                            }
                        } //if j
                    } catch (e) {
                        //log(e);
                    }

                    if (Data.length <= 0) {
                        setResult([]);
                    } else {
                        items.push({
                            title: "正在加载中第" + MY_PAGE + "页，进度：1/" + Data.length,
                            url: "",
                            col_type: "text_center_1",
                            desc: "",
                            pic_url: "",
                            extra: {
                                id: pageid
                            }
                        });
                        setResult(items);
                        let tasks = [];
                        for (let k in Data) {
                            let it = Data[k];
                            tasks.push({
                                func: function (param) {
                                    let d = [];
                                    var sear = $('').rule((cktitle) => {
                                            eval(fetch('hiker://files/rules/xyq/hikermovie.js'));
                                            hikseaerji();
                                        }, param.tit.tit);
                                    let html = fetch(param.it.url, param.it.options);
                                    if (html == "" || html == null || html.substring(0, 5) == 'error') {
                                        d.push({
                                            title: param.tit.tit + ' ' + '未搜索到，点击访问原网页',
                                            url: param.it.url,
                                            desc: "",
                                            pic_url: "",
                                            col_type: 'text_1'
                                        });
                                    } else if (/btwaf/.test(html)) {
                                        let cook = JSON.parse(fetchCookie(param.it.url, {
                                                    headers: {
                                                        "User-Agent": MOBILE_UA
                                                    }
                                                })).join(';');
                                        html = fetch(param.it.url + '?btwaf' + html.match(/btwaf(.*?)\"/)[1], {
                                            headers: {
                                                "User-Agent": MOBILE_UA,
                                                "Cookie": cook
                                            }
                                        });
                                    } else if (html.search(/请输入验证码|此数据需要输入验证码|验证后查看搜索结果|访问此数据需要输入验|正确的验证码继续访问|需要先输入验证码/) != -1) {
                                        if (html.search(/验证后查看搜索结果/) != -1) {
                                            d.push({
                                                title: param.tit.tit + ' ' + '有搜索验证，点击进入原网页搜索',
                                                url: param.it.url,
                                                desc: "",
                                                pic_url: "",
                                                col_type: 'text_1'
                                            });
                                        } else {                                            
                                            d.push({
                                                title: param.tit.tit + ' ' + '需要输入验证码后才能搜索',
                                                url: param.it.url + ';get;utf-8;{User-Agent@.js:MOBILE_UA&&Cookie@.js:fetch("hiker://files/rules/xyq/xqyscookie/' + param.tit.tit + 'cookie.txt", {})}' + sear,
                                                desc: "",
                                                pic_url: "",
                                                col_type: 'text_1'
                                            });
                                        }
                                    } else {
                                        var spl = param.it.url.match(/([\S]*?:\/\/[\S]*?)\//)[1];
                                        //setError(spl);
                                        if (html.indexOf('人机身份验证，请完成以下操作') > -1) {
                                            eval(getItem('huadong').replace(/refre/g, spl));
                                            var html = fetch(param.it.url, {
                                                headers: {
                                                    "User-Agent": MOBILE_UA,
                                                    "Cookie": cok,
                                                    "Referer": spl
                                                }
                                            });
                                        };
                                        eval(fetch('hiker://files/rules/xyq/hikermovie.js'));
                                        ssjiex();

                                    };
                                    return d;
                                },
                                param: {
                                    it: it,
                                    tit: Tit[k]
                                },
                                id: "task"
                            });
                        }

                        batchExecute(tasks, {
                            func: function (param, id, error, result) {
                                //log("listener: " + (result || []).length)
                                param.i = param.i + 1;
                                if (result) {
                                    for (let it of result) {
                                        param.j = param.j + 1;
                                        addItemBefore(pageid, {
                                            title: it.title,
                                            desc: it.desc,
                                            url: it.url,
                                            pic_url: it.pic_url,
                                            col_type: it.col_type,
                                            extra: {
                                                id: "__xqys" + MY_PAGE + "@" + param.j
                                            }
                                        })
                                    }

                                }
                                if (param.i >= param.all) {
                                    deleteItem(pageid)
                                } else {
                                    updateItem({
                                        title: "正在加载第" + MY_PAGE + "页，进度：" + (param.i + 1) + "/" + param.all,
                                        url: "",
                                        pic_url: "",
                                        col_type: "text_center_1",
                                        desc: "",
                                        extra: {
                                            id: pageid
                                        }
                                    })
                                }
                            },
                            param: {
                                all: Data.length,
                                i: 0,
                                j: -1
                            }
                        })
                    }
                }, list, ssmd, urlph),
                col_type: 'text_center_1'
            });
        } //for i
    } //mode type

    if (ssmd == '0' || MY_TYPE == "home") {
        for (var i = 0; i < json.data.length; i++) {
            var tabs = json.data[i].type;
            var list = json.data[i].list;
            if (MY_TYPE != "home") {
                d.push({
                    title: " 选择一个项目查看 ““" + spl[2] + "”” 的搜索结果",
                    col_type: 'text_center_1'
                });
            }
            for (var j = 0; j < list.length; j++) {
                var url = list[j].url;
                eval(urlph);
                if (/zhenbuka|ikandy|ysgc|cokemv|tvyb|saohuo|guapi|kanju77|tegouys|tkznp|ak1080/.test(url)) {
                    var link = url + ';get;utf-8;{User-Agent@.js:MOBILE_UA&&Cookie@.js:fetch("hiker://files/rules/xyq/xqyscookie/' + list[j].title + 'cookie.txt", {})}';
                } else if (/kunyu77/.test(url)) {
                    var link = url + ';get;utf-8;{User-Agent@okhttp/3.12.0}';
                } else if (/555movie|dami10/.test(url)) {
                    var link = url + ';get;utf-8;{User-Agent@.js:MOBILE_UA&&Cookie@searchneed=ok}';
                } else {
                    var link = url
                }
                d.push({
                    title: list[j].title,
                    img: list[j].ico,
                    url: $(link).rule((cktitle) => {
                        eval(fetch('hiker://files/rules/xyq/hikermovie.js'));
                        hikseaerji();
                    }, list[j].title),
                    col_type: 'icon_4_card'
                });
            }
        }
    }
    res.data = d;
    setSearchResult(res);
}

//搜索列表解析函数
function ssjiex() {
    //取搜索结果列表
    try {
        if (/<rss/.test(html) && /<generator>/.test(html)) {
            var list = pdfa(html, "rss&&item");
        }
        //suggest
        else if (/jpys|yingkuya|9eguoyu|smdyy|juhuang/.test(spl)) {
            var list = JSON.parse(html).list;
        } else if (/kunyu77/.test(spl)) {
            var list = JSON.parse(html).data;
        } else if (/search_list/.test(html)) {
            var list = pdfa(html, '.search_list&&li');
        } else if (/list-unstyled/.test(html) && /justify-content-between/.test(html)) {
            var list = pdfa(html, 'body&&.list-unstyled');
        } else if (/globalMarginTop/.test(html) && /globalPicList/.test(html)) {
            var list = pdfa(html, '#data_list&&li');
        } else if (/list-unstyled/.test(html)) {
            var list = pdfa(html, '.list-unstyled:has(.continu)&&li');
        } else if (/pack-packcover/.test(html)) {
            var list = pdfa(html, 'body&&.search-list');
        } else if (/hl-list-item|hy-main-content/.test(html)) {
            var list = pdfa(html, 'body&&.hl-list-item||.hy-video-details');
        } else if (/module-list/.test(html) && /module-search-item/.test(html)) {
            var list = pdfa(html, 'body&&.module-search-item');
        } else if (/module-card-items/.test(html) && /module-card-item-info/.test(html)) {
            var list = pdfa(html, 'body&&.module-card-item');
        } else if (/search-list/.test(html) && /card/.test(html)) {
            var list = pdfa(html, '.search-list&&.card');
        } else if (/searchList/.test(html)) {
            var list = pdfa(html, '#searchList&&li');
        } else if (/searchlilst/.test(html)) {
            var list = pdfa(html, '.searchlilst&&li');
        } else if (/stui-vodlist__media/.test(html)) {
            var list = pdfa(html, '.stui-vodlist__media&&li');
        } else if (/stui-vodlist/.test(html)) {
            var list = pdfa(html, '.stui-vodlist&&li:has(a)');
        } else if (/vodlist/.test(html) && /searchlist_item/.test(html)) {
            var list = pdfa(html, '.vodlist&&li');
        } else if (/class\=\"v_list/.test(html)) {
            var list = pdfa(html, '.v_list&&li:has(a)');
        } else if (/mo-main-info/.test(html)) {
            var list = pdfa(html, '.mo-main-info&&.mo-deta-info:has(a)');
        } else if (/mo-main-foot/.test(html) && /mo-info-item/.test(html)) {
            var list = pdfa(html, '.mo-main-foot&&.mo-info-wrap:has(a)');
        } else if (/fed-main-info/.test(html)) {
            var list = pdfa(html, '.fed-main-info&&.fed-deta-info');
        } else if (/long-list/.test(html) && /long-result/.test(html)) {
            var list = pdfa(html, '.long-result&&li');
        } else if (/index-area/.test(html) && /link-hover/.test(html) && /sy-nav-down|sj-nav-down/.test(html)) {
            var list = pdfa(html, 'body&&.main&&li:has(.link-hover)');
        } else if (/box-main-content/.test(html) && /col-sm-4/.test(html)) {
            var list = pdfa(html, '.box-main-content&&.col-sm-4');
        } else if (/data_list/.test(html) && /DianDian/.test(html)) {
            var list = pdfa(html, 'body&&#data_list&&.DianDian');
        } else if (/tbox_m2/.test(html) && /tbox_t/.test(html)) {
            var list = pdfa(html, 'body&&.tbox_m2&&li');
        } else if (/tbox_m/.test(html) && /tbox_t/.test(html)) {
            var list = pdfa(html, 'body&&.tbox_m&&li');
        } else if (/common-action/.test(html) && /vod_list/.test(html)) {
            var list = pdfa(html, 'body&&#vod_list&&li');
        }
    } catch (e) {}
    //setError(list);
    try {
        var tkt = param.tit.tit;
        var dku = param.it.url;
    } catch (e) {
        var tkt = '';
        var dku = MY_URL;
    }

    if (list) {
        if (list.length < 1) {
            d.push({
                title: tkt + ' ' + '未搜索到，点击访问原网页',
                url: dku,
                desc: "",
                pic_url: "",
                col_type: 'text_1'
            });
        } else {
            for (var i = 0; i < list.length; i++) {
                var cont = '',
                desc = '';
                if (/jpys|yingkuya|9eguoyu|smdyy/.test(spl)) {
                    //suggest搜索数据
                    var title = list[i].name;
                    var img = list[i].pic;
                    if (/smdyy/.test(spl)) {
                        var url = spl + '/kan/' + list[i].id + '.html';
                    } else {
                        var url = spl + '/voddetail/' + list[i].id + '.html';
                    }
                } else if (/<rss/.test(html) && /<generator>/.test(html)) {
                    //Rss搜索数据
                    var title = list[i].match(/\<title\>(.*?)\<\/title\>/)[1];
                    var desc = pdfh(list[i], 'description&&Text');
                    var cont = pdfh(list[i], 'pubdate&&Text');
                    var url = list[i].match(/\<link\>(.*?)\n/)[1];
                } else {
                    //标题
                    try {
                        if (/img/.test(list[i]) && /alt/.test(list[i]) && !/<!-- <img/.test(list[i])) {
                            var title = pdfh(list[i], 'img&&alt');
                        } else if (/kunyu77/.test(spl)) {
                            var title = list[i].videoName;
                        } else if (/juhuang/.test(spl)) {
                            var title = list[i].vod_name;
                        } else if (/h1|h2|h3|h4/.test(list[i])) {
                            var title = pdfh(list[i], 'h1||h2||h3||h4&&a&&Text');
                        } else if (/module-card-item-title/.test(list[i])) {
                            var title = pdfh(list[i], '.module-card-item-title&&Text');
                        } else if (/title/.test(list[i])) {
                            var title = pdfh(list[i], 'a&&title');
                        } else {
                            var title = pdfh(list[i], 'a&&Text');
                        }
                    } catch (e) {}

                    //图片
                    try {
                        if (/kunyu77/.test(spl)) {
                            var img = list[i].videoCover;
                        } else if (/juhuang/.test(spl)) {
                            var img = list[i].vod_pic;
                        } else if (/module-list/.test(html) && /module-search-item/.test(html)) {
                            var img = pdfh(list[i], ".lazyload||.lazyloaded||.lazy&&data-src||data-original");
                        } else if (/background-position/.test(list[i])) {
                            var img = list[i].match(/url\((.*?)\)/)[1];
                        } else if (/vbox/.test(list[i]) && /vbox_t/.test(list[i])) {
                            var img = pdfh(list[i], "a&&style||data-original");
                        } else {
                            var img = pd(list[i], '.lazyload||.lazyloaded||.lazy||.mo-situ-pics||.mo-lazy-load||.fed-list-pics||.img-responsive||.eclazy||.video-pic||.videopic||.hl-lazy||.leo-lazy&&data-original||data-src||style||data-bg');
                        }
                    } catch (e) {}

                    //状态
                    try {
                        if (/kunyu77/.test(spl)) {
                            var desc = list[i].msg;
                        } else if (/vbox/.test(list[i]) && /vbox_t/.test(list[i])) {
                            var desc = pdfh(list[i], 'span&&Text');
                        } else if (/class="jidi"|class="hdinfo"|class="qr"/.test(list[i])) {
                            var desc = pdfh(list[i], '.jidi||.hdinfo||.qr&&Text');
                        } else {
                            var desc = pdfh(list[i], '.pic-text||.pic_text||.mo-situ-rema||.fed-list-remarks||.continu||.newname||.meta||.v_note||.note||.pack-prb||.hl-pic-text||.pic-tag||.other||.score||.video-serial||.list-remarks||.module-item-note&&Text');
                        }
                    } catch (e) {}

                    //简介
                    try {
                        /*if (/aidi/.test(spl)) {
                            var cont = pdfh(list[i], 'p,-1&&Text');
                        } else */if (/class="type"|class="time"/.test(list[i])) {
                            var typ = pdfh(list[i], '.type&&Text');
                            var tim = pdfh(list[i], '.time&&Text');
                            var cont = typ + ' ' + tim;
                        } else if (/kunyu77/.test(spl)) {
                            var cont = list[i].briefContext;
                        } else if (/module-card-item-info/.test(list[i])) {
                            var cont = pdfh(list[i], '.module-card-item-info&&.module-info-item,-1&&Text');
                        } else {
                            var cont = pdfh(list[i], '.detail||dd||.fed-deta-content||.cell_imform_kv_desc||.leo-detail-media||.description||.ecitem-desc||.hl-item-content||.hy-video-details||.list-detail||.actor||.video-info-main||.stui-vodlist__detail&&Text');
                        }
                    } catch (e) {}

                    //链接
                    //if(/bwl87/.test(spl)){var url = spl+'/detail/'+list[i].id+'/';}
                    if (/kunyu77/.test(spl)) {
                        //var url = 'http://api.kunyu77.com/api.php/provide/videoPlaylist?ids=' + list[i].id + ';get;utf-8;{User-Agent@Dalvik/2.1.0}';
                        var url = 'hiker://empty##'+spl+'##' + list[i].id;
                    } else if (/juhuang/.test(spl)) {
                        var url = 'https://juhuang.tv/play/' + list[i].vod_id + '_play_1_1.html';
                    } else if (/hgyx/.test(spl)) {
                        var zykurl = pdfh(list[i], "a&&href");
                        var url = spl + zykurl.replace('/detail/', '/play/').replace('.html', '/sid/1/nid/1.html');
                    } else {
                        var url = pdfh(list[i], 'a&&href');
                    }
                } //suggest判断结束{}

                //无图的显示
                //log(url);
                if (!img) {
                    if (ssmd == 0) {
                        d.push({
                            title: '““' + title + '””',
                            url: ((url.substring(0, 4) == 'http'||url.substring(0, 4) == 'hike') ? url : spl + url) + `@rule=js:eval(fetch('hiker://files/rules/xyq/hikermovie.js'));omerj();`,
                            desc: cont + ' ' + tkt,
                            pic_url: "",
                            col_type: 'text_1'
                        });
                    } else {
                        d.push({
                            title: MY_TYPE == "home" ? title.replace(getMyVar("xyqxqystext", ""), '““' + getMyVar("xyqxqystext", "") + '””') : title,
                            url: $(((url.substring(0, 4) == 'http'||url.substring(0, 4) == 'hike') ? url : spl + url)).rule((tkt,patt) => {
                            	if(tkt!=''){setPageTitle(tkt+'-'+patt);}
                                eval(fetch('hiker://files/rules/xyq/hikermovie.js'));
                                omerj();
                            },tkt,title),
                            pic_url: "",
                            desc: cont + ' ' + tkt,
                            col_type: 'text_center_1'
                        });
                    }
                }
                //有图的显示
                else {
                    if (img.substring(0, 4) == 'http') {
                        img = img;
                    } else {
                        img = spl + img
                    }
                    if (/imgdb/.test(img)) {
                        var tup = img + '@Referer=';
                    } else if (/look4you/.test(img)) {
                        var tup = img + '@Referer=' + spl;
                    } else {
                        var tup = img + '@Referer=' + img
                    }
                    if (ssmd == 0) {
                        d.push({
                            title: '““' + title + '””' + '\n' + desc + '\n' + tkt,
                            pic_url: tup,
                            url: ((url.substring(0, 4) == 'http'||url.substring(0, 4) == 'hike') ? url : spl + url) + `@rule=js:eval(fetch('hiker://files/rules/xyq/hikermovie.js'));omerj();`,
                            desc: cont,
                            col_type: 'movie_1_vertical_pic'
                        });
                    } else {
                        d.push({
                            title: MY_TYPE == "home" ? title.replace(getMyVar("xyqxqystext", ""), '““' + getMyVar("xyqxqystext", "") + '””') + ' ' + desc + '\n' + tkt : title + ' ' + desc,
                            pic_url: tup,
                            url: $(((url.substring(0, 4) == 'http'||url.substring(0, 4) == 'hike') ? url : spl + url)).rule((tkt,patt) => {
                            	if(tkt!=''){setPageTitle(tkt+'-'+patt);}
                                eval(fetch('hiker://files/rules/xyq/hikermovie.js'));
                                omerj();
                            },tkt,title),
                            desc: MY_TYPE == "home" ? cont : ' ' + tkt,
                            content: cont,
                            col_type: 'movie_1_vertical_pic'
                        });
                    }
                }

            }
        } //for i

    } //if(list)
    else {
        d.push({
            title: tkt + ' ' + '未搜索到，点击访问原网页',
            url: dku,
            desc: "",
            pic_url: "",
            col_type: 'text_1'
        });
    }
}

//搜索二级解析函数
function hikseaerji() {
    var res = {};
    var d = [];
    var html = getResCode();
    var json = JSON.parse(fetch('hiker://files/rules/xyq/hikermovie.json', {}));
    var ssmd = getItem('ssmode','1');
    //过宝塔检测
    if (html.indexOf('检测中') != -1) {
        let cook = JSON.parse(fetchCookie(MY_URL, {
                    headers: {
                        "User-Agent": MOBILE_UA
                    }
                })).join(';');
        html = fetch(MY_URL + '?btwaf' + html.match(/btwaf(.*?)\"/)[1], {
            headers: {
                "User-Agent": MOBILE_UA,
                "Cookie": cook
            }
        });
    };
    //setError(html);

    var spl = MY_URL.match(/([\S]*?:\/\/[\S]*?)\//)[1];
    if (html.indexOf('人机身份验证，请完成以下操作') > -1) {
        eval(getItem('huadong').replace(/refre/g, spl));
        var html = fetch(MY_URL, {
            headers: {
                "User-Agent": MOBILE_UA,
                "Cookie": cok,
                "Referer": spl
            }
        });
    };
//log(html);
    //处理搜索验证
    if (html.search(/请输入验证码|验证后查看搜索结果|访问此数据需要输入验|正确的验证码继续访问|需要先输入验证码/) != -1) {
        //滑块验证x5处理
        if (spl.search(/zhenbuka|ikandy/) != -1) {
            if (spl.search(/zhenbuka/) != -1) {
                var coklink = spl+'/vodsearch/xqyszbkcookie----------1---/';
            }else if (spl.search(/ikandy/) != -1) {
                var coklink = spl+'/vodsearch/xqysikandycookie----------1---/';
            }
            d.push({
                title: '',
                desc: 'auto',
                url: coklink,
                extra: {
                    ua: MOBILE_UA,
                    js: $.toString(() => {
                        if (/zhenbuka/.test(window.location.host)) {
                            if (document.querySelector('h3').innerHTML.indexOf('xqyszbkcookie') >= 0) {
                                fy_bridge_app.writeFile('hiker://files/rules/xyq/xqyscookie/zbkcookie.txt', document.cookie);
                                fy_bridge_app.writeFile('hiker://files/rules/xyq/xqyscookie/真不卡影视cookie.txt', document.cookie);
                                fy_bridge_app.refreshPage(false);
                            }
                        }else if (/ikandy/.test(window.location.host)) {
                            if (document.querySelector('h3').innerHTML.indexOf('xqysikandycookie') >= 0) {
                                fy_bridge_app.writeFile('hiker://files/rules/xyq/xqyscookie/ikandycookie.txt', document.cookie);
                                fy_bridge_app.writeFile('hiker://files/rules/xyq/xqyscookie/爱看影视cookie.txt', document.cookie);
                                fy_bridge_app.refreshPage(false);
                            }
                        }
                    })
                },
                col_type: 'x5_webview_single'
            });
        }
        //验证码输入处理
        else {
            if (spl.search(/98bbw|cokemv/) != -1) {
                var imglin = spl + '/verify/index.html?' + Math.random();
            } else if (spl.search(/saohuo/) != -1) {
                var imglin = spl + '/include/vdimgck.php?get=' + new Date();
            } else {
                var imglin = spl + '/index.php/verify/index.html?r=' + Math.random();
            }
            //取cookie
            var cok = JSON.parse(fetchCookie(imglin, {
                        headers: {
                            'User-Agent': MOBILE_UA
                        },
                        method: 'GET',
                        withHeaders: true
                    })).join(';');

            //显示验证码
            //var img = spl + '/index.php/verify/index.html?' + Math.random() + '@User-Agent=' + MOBILE_UA + '@Cookie=' + cok;
            d.push({
                pic_url: imglin + '@User-Agent=' + MOBILE_UA + '@Cookie=' + cok,
                url: $('').lazyRule(() => {
                    return refreshPage();
                }),
                col_type: 'pic_1_full'
            });
            //输入框
            d.push({
                title: '',
                url: "'toast://你输入的是' + input",
                extra: {
                    onChange: "putMyVar('香情验证码',input)",
                    titleVisible: false
                },
                col_type: 'input'
            });
            //发送验证
            d.push({
                title: '发送',
                url: $(MY_URL).lazyRule((cok, spl, cktitle) => {
                    var cod = getMyVar('香情验证码');
                    //发送验证请求
                    if (spl.search(/98bbw/) != -1) {
                        var html = fetch(input, {
                            headers: {
                                'User-Agent': MOBILE_UA,
                                'Cookie': cok
                            },
                            body: 'vod_search_verify_code=' + cod,
                            method: 'POST'
                        });
                    } else if (spl.search(/saohuo/) != -1) {
                        var html = fetch('https://saohuo.vip/search.php?scheckAC=check&page=&searchtype=&order=&tid=&area=&year=&letter=&yuyan=&state=&money=&ver=&jq=', {
                            headers: {
                                'User-Agent': MOBILE_UA,
                                'Cookie': cok
                            },
                            body: 'validate=' + cod + '&searchword=',
                            method: 'POST'
                        });
                    } else {
                        var html = JSON.parse(fetch(spl + '/index.php/ajax/verify_check?type=search&verify=' + cod, {
                                    headers: {
                                        'X-Requested-With': 'XMLHttpRequest',
                                        'User-Agent': MOBILE_UA,
                                        'Cookie': cok
                                    },
                                    body: '',
                                    method: 'POST'
                                }));
                    };
                    //对验证进行判断
                    if (spl.search(/98bbw/) != -1) {
                        if (html.indexOf('输入验证码后查看搜索结果') > 0) {
                            return "toast://验证失败。"
                        } else {
                            writeFile('hiker://files/rules/xyq/xqyscookie/' + cktitle + 'cookie.txt', cok);
                            refreshPage();
                            return "toast://验证成功。"
                        }
                    } else if (spl.search(/saohuo/) != -1) {
                        if (html.indexOf('正确的验证码继续访问') > 0) {
                            return "toast://验证失败。"
                        } else {
                            writeFile('hiker://files/rules/xyq/xqyscookie/' + cktitle + 'cookie.txt', cok);
                            refreshPage();
                            return "toast://验证成功。"
                        }
                    } else {
                        if (html.code == 1) {
                            writeFile('hiker://files/rules/xyq/xqyscookie/' + cktitle + 'cookie.txt', cok);
                            refreshPage();
                            return "toast://验证成功。"
                        } else {
                            return "toast://验证失败！"
                        }
                    } //验证if结束
                }, cok, spl, cktitle),
                col_type: 'text_2'
            });
        }
        //对验证处理结束
    } else if (html.indexOf('不要频繁操作') >= 0) {
        d.push({
            title: '太过频繁，等待6秒后下滑刷新本页面。',
            col_type: 'text_center_1'
        })

    } else {
        //取搜索结果列表
        eval(fetch('hiker://files/rules/xyq/hikermovie.js'));
        ssjiex();
    }
    res.data = d;
    setHomeResult(res);
}

//选集列表规则函数
function omerj() {
    var res = {};
    var d = [];
    //声明x5框架
    d.push({
        title: '',
        desc: '255&&float',
        url: '',
        col_type: 'x5_webview_single'
    });
    refreshX5WebView('');

    var html = getResCode();
    if(MY_URL.includes("kunyu77")){
      MY_URL=html.split("##")[1]+"/";
      let vid = html.split("##")[2];
      let qqtime = parseInt(new Date().getTime() / 1000) + '';
      let qqtok = md5('/api.php/provide/videoPlaylist' + vid + '0101100022.0.4' + qqtime + 'XSpeUFjJ');
      html = fetch('http://api.kunyu77.com/api.php/provide/videoPlaylist?ids=' + vid + '&pcode=010110002&version=2.0.4', {
       headers: {
        "User-Agent": "okhttp/3.12.0",
        "t": qqtime,
        "TK": qqtok
      }
     });
    }
    if (html.indexOf('检测中') != -1) {
        let cook = JSON.parse(fetchCookie(MY_URL, {
                    headers: {
                        "User-Agent": MOBILE_UA
                    }
                })).join(';');
        html = fetch(MY_URL + '?btwaf' + html.match(/btwaf(.*?)\"/)[1], {
            headers: {
                "User-Agent": MOBILE_UA,
                "Cookie": cook
            }
        });
    };
    //取网址
    var omdomin = MY_URL.match(/([\S]*?:\/\/[\S]*?)\//)[1];
    if (html.indexOf('人机身份验证，请完成以下操作') > -1) {
        eval(getItem('huadong').replace(/refre/g, omdomin));
        var html = fetch(MY_URL, {
            headers: {
                "User-Agent": MOBILE_UA,
                "Cookie": cok,
                "Referer": omdomin
            }
        });
    };
    //setError(html);
    //线路统计
    if (/kunyu77/.test(omdomin)) {
        var conts = [""];
    } else if (/renrenmi/.test(omdomin)) {
        var tabs = pdfa(html, "body&&#playlist");
    } else if (/saohuo/.test(omdomin)) {
        var tabs = pdfa(html, 'body&&.from_list&&li');
        var conts = pdfa(html, 'body&&#play_link&&li');
    } else if (/hy-play-list/.test(html) && /tab-content/.test(html)) {
        var tabs = pdfa(html, '.tab-content&&.option');
        var conts = pdfa(html, '.tab-content&&.playlist');
    } else if (/hl-plays-list/.test(html) && /hl-plays-from/.test(html)) {
        var tabs = pdfa(html, '.hl-plays-from&&a');
        var conts = pdfa(html, '.hl-play-source&&.hl-plays-list');
    } else if (/nav-tabs/.test(html) && /#playlist/.test(html)) {
        var tabs = pdfa(html, ".nav-tabs&&li");
    } else if (/nav-tabs/.test(html) && /#player/.test(html)) {
        var tabs = pdfa(html, ".nav-tabs&&.item&&li");
    } else if (/nav-tabs/.test(html) && /player-sidebar/.test(html)) {
        var tabs = pdfa(html, ".nav-tabs&&.item&&li");
    } else if (/nav-tabs/.test(html) && /ff-playurl-tab/.test(html)) {
        var tabs = pdfa(html, ".nav-tabs&&li");
    } else if (/nav-tabs/.test(html) && /#con_playlist/.test(html)) {
        var tabs = pdfa(html, "body&&.nav-tabs&&.gico");
    } else if (/stui-content__detail/.test(html) && /stui-content__playlist/.test(html)) {
        if (/fa-youtube-play|pull-right/.test(html)) {
            var tabs = pdfa(html, "body&&.stui-pannel__head||.stui-vodlist__head");
        } else if (/s-playsite/.test(html)) {
            var tabs = pdfa(html, "body&&.js-list&&li");
        } else if (/open-dropdown/.test(html)) {
            var tabs = pdfa(html, "body&&.dropdown-menu&&li");
        } else if (/stui-vodlist__head/.test(html)) {
            var tabs = pdfa(html, "body&&.stui-vodlist__head");
        } else {
            var tabs = pdfa(html, "body&&.playlist");
        }
    } else if (/stui-player__video/.test(html) && /stui-play__list/.test(html)) {
        var tabs = pdfa(html, ".play-tab&&li");
    } else if (/myui-panel__head/.test(html) && /sort-button/.test(html)) {
        var tabs = pdfa(html, "body&&.myui-panel_hd:has(.sort-button)");
    } else if (html.indexOf('mo-sort-head') != -1) {
        var tabs = pdfa(html, 'body&&.mo-sort-head&&.mo-movs-btns');
        var conts = pdfa(html, 'body&&.mo-main-info&&.mo-movs-item');
    } else if (html.indexOf('mo-list-boxs') != -1) {
        var tabs = pdfa(html, 'body&&.mo-list-wrap');
        var conts = pdfa(html, 'body&&.mo-list-boxs');
    } else if (html.indexOf('play_source_tab') != -1) {
        var tabs = pdfa(html, '.play_source_tab&&a');
    } else if (/fed-tabs-item/.test(html)) {
        var tabs = pdfa(html, '.fed-tabs-item&&.fed-btns-info');
    } else if (/leo-source-cho/.test(html)) {
        var tabs = pdfa(html, 'body&&.leo-source-cho&&li');
    } else if (/player_list/.test(html) && /justify-content-center/.test(html)) {
        var tabs = pdfa(html, 'body&&#player_list&&h2');
        var conts = pdfa(html, '#player_list&&ul');
    } else if (/tagContent/.test(html) && /js-list/.test(html)) {
        var tabs = pdfa(html, "body&&.js-list&&li");
        var conts = pdfa(html, 'body&&#tagContent&&ul');
    } else if (/playNumTab/.test(html) && /tabContainer/.test(html)) {
        var tabs = pdfa(html, 'body&&#playNumTab&&a');
    } else if (/playfrom/.test(html) && /videourl/.test(html)) {
        var tabs = pdfa(html, "body&&.playfrom&&li");
        var conts = pdfa(html, 'body&&.videourl');
    } else if (/tab_content/.test(html) && /tab_control/.test(html)) {
        var tabs = pdfa(html, 'body&&.play_from&&li');
        var conts = pdfa(html, 'body&&.play_list');
    }

    //setError(tabs);
    //列表统计
    if (/czspp|magedn|subaibai|nfyingshi/.test(omdomin)) {
        var conts = pdfa(html, 'body&&.paly_list_btn');
    } else if (/tab-content/.test(html) && /list-unstyled/.test(html)) {
        var conts = pdfa(html, 'body&&.tab-content&&ul');
    } else if (/tab-content/.test(html) && /stui-content__playlist/.test(html)) {
        var conts = pdfa(html, 'body&&.stui-content__playlist');
    } else if (/stui-content__detail/.test(html) && /stui-content__playlist/.test(html)) {
        var conts = pdfa(html, 'body&&.stui-content__playlist');
    } else if (/stui-content__detail/.test(html) && !/stui-content__playlist/.test(html)&&/btn-primary/.test(html)) {
        var conts = pdfa(html, 'body&&.btn-primary');
    } else if (/stui-player__video/.test(html) && /stui-play__list/.test(html)) {
        var conts = pdfa(html, "body&&.stui-play__list");
    } else if (/tab-content/.test(html) && /myui-content__list/.test(html)) {
        var conts = pdfa(html, 'body&&.myui-content__list');
    } else if (/tabContainer/.test(html) && /playNumList/.test(html)) {
        if (/urlsTab/.test(html)) {
            var conts = pdfa(pdfh(html, 'body&&#tabContainer&&Html'), 'body&&.tabContainer');
        } else {
            var conts = pdfa(html, '#tabContainer&&.playNumList')
        };
    } else if (/playlist_full/.test(html) && /content_playlist/.test(html)) {
        var conts = pdfa(html, 'body&&.playlist_full:has(.content_playlist)');
    } else if (/play_list_box/.test(html) && /content_playlist/.test(html)) {
        var conts = pdfa(html, 'body&&.playlist_notfull:has(.content_playlist)');
    } else if (/tab-play/.test(html) && /content_playlist/.test(html)) {
        var tabs = pdfa(html, 'body&&#bofy&&h2');
        var conts = pdfa(html, 'body&&.content_playlist');
    } else if (/details-info/.test(html) && /con_playlist/.test(html)) {
        var conts = pdfa(html, '.playlist&&ul');
    } else if (/fed-play-item|leo-play-num/.test(html)) {
        var conts = pdfa(html, 'body&&.fed-play-item||.leo-play-num');
    } else if (/contentURL/.test(html) && /movievod/.test(html)) {
        var conts = pdfa(html, 'body&&.contentURL&&ul');
    } else if (/module-tab-item/.test(html) && /module-play-list-content/.test(html)) {
        var tabs = pdfa(html, 'body&&.module-tab-item');
        var conts = pdfa(html, 'body&&.module-play-list-content');
    } else if (/module-tab-item/.test(html) && /module-player-list/.test(html)) {
        var tabs = pdfa(html, 'body&&.module-tab-item');
        var conts = pdfa(html, 'body&&.module-player-list:has(.scroll-content)');
    } else if (/tabs_block/.test(html) && /list_block/.test(html)) {
        var tabs = pdfa(html, 'body&&.tabs');
        var conts = pdfa(html, 'body&&.list_block');
    } else if (/albumSelect/.test(html) && /mod-head-title/.test(html)) {
        var tabs = pdfa(html, 'body&&section:has(.albumSelect)');
        var conts = pdfa(html, 'body&&.albumSelect');
    } else if (/playListBox/.test(html) && /play-list/.test(html)) {
        var tabs = pdfa(html, 'body&&#playListBox&&.play-list');
        var conts = pdfa(html, 'body&&#playListBox&&.play-list');
    }

    //setError(conts);
    //-----华丽的分割线-----
    if (conts || tabs) {
        for (var i = 0; i < conts.length; i++) {
            //取各列表
            if (/kunyu77/.test(omdomin)) {
                var list = JSON.parse(html).data.episodes;
            } else if (/contentURL/.test(html) && /movievod/.test(html)) {
                var list = conts[i].match(/name=\"copy_sel[\s\S]*?<span>/g);
            } else if (/fed-btns-info/.test(conts[i])) {
                var list = pdfa(conts[i], 'body&&.fed-btns-info');
            } else if (/scroll-content/.test(conts[i]) && /scroll-box/.test(conts[i])) {
                var list = pdfa(conts[i], 'body&&.scroll-content&&a');
            } else if (/<li>/.test(conts[i])) {
                var list = pdfa(conts[i], 'body&&li');
            } else {
                var list = pdfa(conts[i], 'body&&a:not(a:contains(展开全部))');
            }

            if (getVar('hikermsort', '1') == '1') {
                list = list;
            } else {
                list = list.reverse();
            }

            //需要显示线路名的
            if (tabs) {
                if (/<\/h3>|<\/h2>/.test(tabs[i])) {
                    var tabt = pdfh(tabs[i], "h3||h2&&Text");
                } else if (/albumSelect|stui-vodlist__head/.test(tabs[i])) {
                    var tabt = pdfh(tabs[i], "span&&Text");
                } else if (/pull-left/.test(tabs[i])) {
                    var tabt = pdfh(tabs[i], ".pull-left&&Text");
                } /*else if (/aidi/.test(omdomin)) {
                    var tabt = pdfh(tabs[i], "a&&alt");
                } */else if (tabs[i] == undefined) {
                    var tabt = "线路一";
                } else {
                    var tabt = pdfh(tabs[i], "body&&Text");
                }

                //显示线路
                d.push({
                    title: tabt + "    🔗" + [i + 1] + '/' + conts.length + "““点击切换选集排序””",
                    url: "hiker://empty@lazyRule=.js:putVar('hikermsort', getVar('hikermsort','1')=='1'?'0':'1');refreshPage(false);'toast://切换成功！'",
                    col_type: 'text_1'
                });
            } else if (conts) {
                d.push({
                    title: '在线播放' + "    🔗" + [i + 1] + '/' + conts.length + "““点击切换选集排序””",
                    url: "hiker://empty@lazyRule=.js:putVar('hikermsort', getVar('hikermsort','1')=='1'?'0':'1');refreshPage(false);'toast://切换成功！'",
                    col_type: 'text_1'
                });
            }

            //选集
            var link = {};
            for (var j = 0; j < list.length; j++) {
                //选集标题与链接
                if (/kunyu77/.test(omdomin)) {
                    var title = list[j].episode;
                    var link = JSON.stringify(list[j].playurls);
                } else if (/renrenmi/.test(omdomin)) {
                    var title = list[j].split('copy_text\">')[1].split('<')[0];
                    var link = list[j].split('$')[1].split('<')[0].replace('amp;', '');
                } else {
                    var title = pdfh(list[j], "a&&Text");
                    var link = pd(list[j], "a&&href");
                }
                try {
                    title = title.match(/(第|\d|-)*(集|话|期)/g) ? title.replace(/第|集|话|期/g, '') : title;
                } catch (e) {
                    title = title
                }
                //setError(MY_URL);
                //显示选集
                if (list.length <= 4) {
                    var clt = 'text_2';
                } else {
                    var clt = isNaN(title) ? 'flex_button' : 'text_5'
                }
                d.push({
                    title: title,
                    url: 'hiker://empty$$$' + omdomin + '$$$' + link + '$$$' + `@lazyRule=.js:/*refreshX5WebView*/eval(fetch('hiker://files/rules/xyq/hikermovie.js'));omlazy();`,
                    extra: {
                        blockRules: ['.css', '.gif', '.jpeg', '.png', '.ico', 'cnzz', '.51.la', 'google', 'xn--*:*', 'hm.baidu.com', '/ads/*.js'],
                        referer: omdomin,
                        id: 'hiker://empty$$$' + omdomin + '$$$' + link + '$$$'
                    },
                    col_type: clt
                });
            } //for j
        } //for i
    }

    //厂长显示下载线路
    if (/czspp|magedn/.test(omdomin)) {
        if (html.indexOf('ypbt_down_list') != -1) {
            d.push({
                title: '下载地址',
                col_type: 'text_1'
            });
            var dnli = pdfa(html, '.ypbt_down_list&&li');

            for (var i = 0; i < dnli.length; i++) {
                d.push({
                    title: pdfh(dnli[i], "a&&title"),
                    col_type: 'text_center_1',
                    url: pd(dnli[i], "a&&href")
                });
            }
        }
    } //end 下载

    res.data = d;
    setHomeResult(res);
}

//最新章节解析函数开始
function hikchapter() {
    var chp = [];
    try {
        var html = getResCode();
        if(MY_URL.includes("kunyu77")){
      MY_URL=html.split("##")[1]+"/";
      let vid = html.split("##")[2];
      let qqtime = parseInt(new Date().getTime() / 1000) + '';
      let qqtok = md5('/api.php/provide/videoPlaylist' + vid + '0101100022.0.4' + qqtime + 'XSpeUFjJ');
      html = fetch('http://api.kunyu77.com/api.php/provide/videoPlaylist?ids=' + vid + '&pcode=010110002&version=2.0.4', {
       headers: {
        "User-Agent": "okhttp/3.12.0",
        "t": qqtime,
        "TK": qqtok
      }
     });
    }
        if (html.indexOf('检测中') != -1) {
            let cook = JSON.parse(fetchCookie(MY_URL, {
                        headers: {
                            "User-Agent": MOBILE_UA
                        }
                    })).join(';');
            html = fetch(MY_URL + '?btwaf' + html.match(/btwaf(.*?)\"/)[1], {
                headers: {
                    "User-Agent": MOBILE_UA,
                    "Cookie": cook
                }
            });
        };
        //取网址
        var omdomin = MY_URL.match(/([\S]*?:\/\/[\S]*?)\//)[1];
        if (html.indexOf('人机身份验证，请完成以下操作') > -1) {
            eval(getItem('huadong').replace(/refre/g, omdomin));
            var html = fetch(MY_URL, {
                headers: {
                    "User-Agent": MOBILE_UA,
                    "Cookie": cok,
                    "Referer": omdomin
                }
            });
        };
        //setError(html);
        //线路统计
        if (/<rss/.test(html) && /<video>/.test(html)) {
            var conts = pdfa(html.replace(/\<\!\[CDATA\[/g, '').replace(/\]\]\>/g, ''), 'rss&&dl&&dd');
        } else if (/kunyu77/.test(omdomin)) {
            var conts = JSON.parse(html).data.episodes;
        } else if (/saohuo/.test(omdomin)) {
            var conts = pdfa(html, 'body&&#play_link&&li');
        } else if (/hy-play-list/.test(html) && /tab-content/.test(html)) {
            var conts = pdfa(html, '.tab-content&&.playlist');
        } else if (/hl-plays-list/.test(html) && /hl-plays-from/.test(html)) {
            var conts = pdfa(html, '.hl-play-source&&.hl-plays-list');
        } else if (html.indexOf('mo-sort-head') != -1) {
            var conts = pdfa(html, 'body&&.mo-main-info&&.mo-movs-item');
        } else if (html.indexOf('mo-list-boxs') != -1) {
            var conts = pdfa(html, 'body&&.mo-list-boxs');
        } else if (/player_list/.test(html) && /justify-content-center/.test(html)) {
            var conts = pdfa(html, '#player_list&&ul');
        } else if (/tagContent/.test(html) && /js-list/.test(html)) {
            var conts = pdfa(html, 'body&&#tagContent&&ul');
        } else if (/playfrom/.test(html) && /videourl/.test(html)) {
            var conts = pdfa(html, 'body&&.videourl');
        } else if (/tab_content/.test(html) && /tab_control/.test(html)) {
            var conts = pdfa(html, 'body&&.play_list');
        }

        //列表统计
        if (/czspp|magedn|subaibai|nfyingshi/.test(omdomin)) {
            var conts = pdfa(html, 'body&&.paly_list_btn');
        } else if (/tab-content/.test(html) && /list-unstyled/.test(html)) {
            var conts = pdfa(html, 'body&&.tab-content&&ul');
        } else if (/tab-content/.test(html) && /stui-content__playlist/.test(html)) {
            var conts = pdfa(html, 'body&&.stui-content__playlist');
        } else if (/stui-content__detail/.test(html) && /stui-content__playlist/.test(html)) {
            var conts = pdfa(html, 'body&&.stui-content__playlist');
        } else if (/stui-content__detail/.test(html) && !/stui-content__playlist/.test(html) && /btn-primary/.test(html)) {
            var conts = pdfa(html, 'body&&.btn-primary');
        } else if (/stui-player__video/.test(html) && /stui-play__list/.test(html)) {
            var conts = pdfa(html, "body&&.stui-play__list");
        } else if (/tab-content/.test(html) && /myui-content__list/.test(html)) {
            var conts = pdfa(html, 'body&&.myui-content__list');
        } else if (/tabContainer/.test(html) && /playNumList/.test(html)) {
            if (/urlsTab/.test(html)) {
                var conts = pdfa(pdfh(html, 'body&&#tabContainer&&Html'), 'body&&.tabContainer');
            } else {
                var conts = pdfa(html, '#tabContainer&&.playNumList')
            };
        } else if (/playlist_full/.test(html) && /content_playlist/.test(html)) {
            var conts = pdfa(html, 'body&&.playlist_full:has(.content_playlist)');
        } else if (/play_list_box/.test(html) && /content_playlist/.test(html)) {
            var conts = pdfa(html, 'body&&.playlist_notfull:has(.content_playlist)');
        } else if (/tab-play/.test(html) && /content_playlist/.test(html)) {
            var conts = pdfa(html, 'body&&.content_playlist');
        } else if (/details-info/.test(html) && /con_playlist/.test(html)) {
            var conts = pdfa(html, '.playlist&&ul');
        } else if (/fed-play-item|leo-play-num/.test(html)) {
            var conts = pdfa(html, 'body&&.fed-play-item||.leo-play-num');
        } else if (/contentURL/.test(html) && /movievod/.test(html)) {
            var conts = pdfa(html, 'body&&.contentURL&&ul');
        } else if (/module-tab-item/.test(html) && /module-play-list-content/.test(html)) {
            var conts = pdfa(html, 'body&&.module-play-list-content');
        } else if (/module-tab-item/.test(html) && /module-player-list/.test(html)) {
            var conts = pdfa(html, 'body&&.module-player-list:has(.scroll-content)');
        } else if (/tabs_block/.test(html) && /list_block/.test(html)) {
            var conts = pdfa(html, 'body&&.list_block');
        } else if (/albumSelect/.test(html) && /mod-head-title/.test(html)) {
            var conts = pdfa(html, 'body&&.albumSelect');
        } else if (/playListBox/.test(html) && /play-list/.test(html)) {
            var conts = pdfa(html, 'body&&#playListBox&&.play-list');
        }

        for (var i = 0; i < conts.length; i++) {
            if (/<rss/.test(html) && /<video>/.test(html)) {
                var list = conts[i].split(">\n")[1].split("\n<")[0].split("#");
            } else if (/kunyu77/.test(omdomin)) {
                var list = conts;
            } else if (/contentURL/.test(html) && /movievod/.test(html)) {
                var list = conts[i].match(/name=\"copy_sel[\s\S]*?<span>/g);
            } else if (/fed-btns-info/.test(conts[i])) {
                var list = pdfa(conts[i], 'body&&.fed-btns-info');
            } else if (/scroll-content/.test(conts[i]) && /scroll-box/.test(conts[i])) {
                var list = pdfa(conts[i], 'body&&.scroll-content&&a');
            } else if (/<li>/.test(conts[i])) {
                var list = pdfa(conts[i], 'body&&li');
            } else {
                var list = pdfa(conts[i], 'body&&a:not(a:contains(展开全部))');
            }
            chp.push(list.length);
        }
    } catch (e) {}
    //log(Math.max.apply(Math,chp));
    setResult('更新至:' + (Math.max.apply(Math, chp)));
}
//最新章节函数结束

//动态解析部分函数
function omlazy() {
    var myurl = input.split('$$$')[1];
    var srcurl = input.split('$$$')[2];
    
    try {
        //通用解析代码
        function getrandom(urlstr) {
    randStr = urlstr.substring(0, 8);
    string = urlstr.substring(8, urlstr.length);
    substr = base64Decode(string);
    return substr.substring(8, substr.length - 8);
}
        //资源网yun
        function zywyun(srcurl) {
            var link = srcurl.split("/share")[0];
            var fc = fetch(srcurl, {}).replace("var purl", "var main");
            if (fc.indexOf("main") != -1) {
                var mat = fc.match(/var main.*?;/)[0];
                eval(mat);
                var play = (main.indexOf("http") != -1 ? main : link + main);
            } else {
                var main = fc.match(/url:.*?[\'\"](.*?)[\'\"]/)[1];
                var play = (main.indexOf("http") != -1 ? main : link + main)
            };
            return play;
        };
        //结束资源网yun
        //x5rule强力嗅探
        function x5rule(links, srcurl) {
            showLoading("正在进行网页访问检索。");
            var video = 'webRule://' + links + '@' + $.toString((srcurl) => {
                //fba.log(fba.getUrls());
                var urls = _getUrls();
                if (window.__count == null || window.__count == 'undefined') {
                    fba.log('网页访问开始');
                    window.__count = 0
                }
                if (window.__count >= 23) {
                    return srcurl
                }
                window.__count = window.__count + 1;
                if (window.__count > 1 && window.__count <= 3 && window.__count != null && window.__count != undefined) {
                    if (document.querySelector('body').innerText.search(/触发了防盗链|未授权|接口防盗/) != -1) {
                        if (window.__count == 2) {
                            fba.log('尝试跳防盗验证一');
                            location.href = location.href;
                        } else {
                            fba.log('尝试跳防盗验证二');
                            location.href = srcurl
                        }
                    };
                } else if (window.__count > 3 && window.__count != null && window.__count != undefined) {
                    if (urls.length < 1) {
                        fba.hideLoading();
                        return 'toast://访问失败，可能链接已失效。';
                    } else if (urls.length == 1) {
                        fba.log('尝试打开直链与JSON解析');
                        if (urls[0].match(/dycdn\-tos\.pstatp|\.m3u8|\.mp4|\.flv|netease\.com|video_mp4|type\=m3u8|\/video\/tos\//) && !urls[0].match(/\.html|\.m3u8\.tv|\.m3u8\.pw|\&next|ac\=dm|\=http|https\:\/\/[\d]\.m3u8|\?url\=\/m3u8/)) {
                            //fy_bridge_app.log(urls[0])
                            if (urls[0].indexOf('bilivideo') != -1) {
                                return urls[0] + ';{Referer@https://www.bilibili.com&&User-Agent@Mozilla/5.0}';
                            } else if (urls[0].indexOf('titan.mgtv.com') != -1) {
                                return urls[0] + '#isVideo=true#' + ';{Referer@www.mgtv.com&&User-Agent@Mozilla/5.0}';
                            } else {
                                return urls[0]
                            };
                        } else if (location.href.match(/dycdn\-tos\.pstatp|\.m3u8|\.mp4|\.flv|netease\.com|video_mp4|type\=m3u8|\/video\/tos\//) && !location.href.match(/html|\.m3u8\.tv|\.m3u8\.pw|\&next|ac\=dm|\=http|https\:\/\/[\d]\.m3u8|\?url\=\/m3u8/)) {
                            return location.href;
                        } else {
                            var html = fba.fetch(location.href, {});
                            if (!/\</.test(html)) {
                                return JSON.parse(html).url;
                            } else {
                                fba.log(location.href)
                            }
                        };
                    } else {
                        fba.log('网页加载日志检索' + window.__count + '');
                        for (var i in urls) {
                            if (urls[i].match(/miued\.com\/m3|dycdn\-tos\.pstatp|\.m3u8|\.mp4|\.flv|netease\.com|video_mp4|type\=m3u8|\/video\/tos\//) && !urls[i].match(/html|\.m3u8\.tv|\.m3u8\.pw|\&next|ac\=dm|\=http|https\:\/\/[\d]\.m3u8|\?url\=\/m3u8/)) {
                                fy_bridge_app.log(urls[i])
                                fba.hideLoading();
                             if(fy_bridge_app.getHeaderUrl){
                               return fy_bridge_app.getHeaderUrl(urls[i]).replace(";{", "#ignoreImg=true##isVideo=true#;{");
                             } else {
                                if (urls[i].indexOf('bilivideo') != -1) {
                                    return urls[i] + ';{Referer@https://www.bilibili.com&&User-Agent@Mozilla/5.0}';
                                } else if (urls[i].indexOf('titan.mgtv.com') != -1) {
                                    return urls[i] + '#isVideo=true#' + ';{Referer@www.mgtv.com&&User-Agent@Mozilla/5.0}';
                                } else if (urls[i].indexOf('juhaokan') != -1) {
                                    return urls[i] + ';{Referer@https://www.juhaokan.cc/}';
                                } else if (urls[i].indexOf('ojbk') != -1) {
                                    return urls[i] + ';{Referer@https://v.ojbkjx.com/}';
                                } else if (urls[i].indexOf('wkfile') != -1) {
                                    return urls[i] + ';{Referer@https://fantuan.wkfile.com/}';
                                } else if (urls[i].indexOf('shenglinyiyang') != -1) {
                                    return urls[i] + ';{Referer@https://zyz.sdljwomen.com/}';
                                } else {
                                    return urls[i] + '#isVideo=true#'
                                }
                            }
                           }
                        } //end for i
                    }
                }
            }, srcurl);
            return video
        }
        //结束x5rule强力嗅探
        //结束通用解析

        //资源网yun链
        if (srcurl.indexOf("135-cdn") != -1) {
            refreshX5WebView(srcurl);
            return "toast://请等待加载选集！";
        } else if (srcurl.indexOf("/share/") != -1) {
            return zywyun(srcurl);
        } else if (/lezhutv|555movie|dami10|newfii|aiyy/.test(myurl)) {
        //直接网页嗅探
            return x5rule(srcurl, srcurl);
        }
        //77影视
        else if (/kunyu77/.test(myurl)) {
            var playurls = JSON.parse(srcurl);
            var tab = [],
            mult = [],
            hean = [];
            for (var i in playurls) {
                var from = playurls[i].playfrom;
                var playurl = playurls[i].playurl;
                if (playurl.indexOf('html') != -1) {
                    try {
                        var jx = 'https://jx.hfyrw.com/mao.go?url=' + playurl;
                        var playurl = JSON.parse(fetch(jx, {})).url;
                    } catch (e) {}
                };
                if (from == 'ppayun') {
                    var head = {
                        'User-Agent': 'Lavf/57.83.100'
                    };
                } else if (from == 'mgtv') {
                    var head = {
                        'User-Agent': 'Mozilla/5.0',
                        'Referer': 'www.mgtv.com'
                    };
                } else {
                    var head = {
                        'User-Agent': 'Mozilla/5.0'
                    };
                };
                mult.push(playurl + '#isVideo=true#');
                tab.push(from);
                hean.push(head);
            };
            return JSON.stringify({
                urls: mult,
                names: tab,
                headers: hean
            });
        }
        //去看吧
        else if (/qkan8/.test(myurl)) {
            var phtml = request(srcurl);
            var urll = pdfh(phtml, '.fed-play-player&&iframe&&data-play');
            if (/qkan8/.test(myurl)) {
                urll = base64Decode(urll.slice(3))
            }
            var pars = pd(phtml, '.fed-play-player&&iframe&&data-pars');
            //直链
            if (/.m3u8|.mp4|obj\/tos/.test(urll) && /http/.test(urll)) {
                if (urll.indexOf('cqzyw') != -1) {
                    var ul = JSON.parse(fetch(urll, {
                                headers: {
                                    "User-Agent": "Dalvik/2.1.0"
                                },
                                redirect: false,
                                withHeaders: true
                            }));
                    if (ul.statusCode == "302") {
                        return ul.headers.location[0];
                    } else {
                        return urll
                    };
                } else {
                    return urll + '#isVideo=true#'
                };
            }
            //全看
            else if (/qkan8/.test(myurl)) {
                if (urll.indexOf('http') != -1) {
                    if (urll.indexOf('html') != -1) {
                        var html = fetch('https://www.cuan.la/m3u8.php?url=' + urll, {
                            headers: {
                                "User-Agent": MOBILE_UA,
                                "Referer": "https://qkan8.com/"
                            }
                        });
                        eval(fetch('https://cdn.jsdelivr.net/gh/lzk23559/Public_folder/token.js', {}));
                        return tkurl.indexOf('url=') > -1 ? tkurl.split('url=')[1] : tkurl;
                    } else {
                        return urll + '#isVideo=true#'
                    };
                } else {
                    var html = fetch(pars + urll, {
                        headers: {
                            "User-Agent": MOBILE_UA,
                            "Referer": "https://qkan8.com/"
                        }
                    });
                    if (html.indexOf('purl') != -1) {
                        var kjjx = pdfh(html, 'body&&Html').match(/var purl = \'(.*?)\'/)[1];
                        var html = fetch('https://qkan8.com' + kjjx, {
                            headers: {
                                "User-Agent": MOBILE_UA,
                                "Referer": "https://qkan8.com/"
                            }
                        })
                    };
                    var vurl = html.indexOf('var vid') != -1 ? html.match(/var vid=\"(.*?)\"/)[1] : html.match(/var url = \'(.*?)\'/)[1];
                    return vurl;
                }
            }
        }
        //疯狗
        else if (/fenggou/.test(myurl)) {
            var phtml = request(srcurl);
            var scrpt = pdfh(phtml, "#cms_player&&script&&Html");
            eval(scrpt);
            var jiek = cms_player.jiexi;
            var urll = cms_player.url;
            var fro = cms_player.name;
            return x5rule(jiek + urll, srcurl);
            }
        //Magedn
        else if (/magedn|czspp|subaibai|nfyingshi/.test(myurl)) {
            var html = request(srcurl, {});
            if (html.indexOf('人机身份验证，请完成以下操作') > -1) {
                eval(getItem('huadong').replace(/refre/g, myurl));
                var html = fetch(srcurl, {
                    headers: {
                        "User-Agent": MOBILE_UA,
                        "Cookie": cok,
                        "Referer": myurl
                    }
                });
            };
            var ohtml = pdfh(html, '.videoplay&&Html');
            if (/decrypted/.test(ohtml)) {
                var phtml = pdfh(ohtml, "body&&script:not([src])&&Html");
                eval(getCryptoJS());
                var scrpt = phtml.match(/var.*?\)\);/g)[0];
                eval(scrpt.replace(/md5/g, 'CryptoJS').replace('eval', 'var data = '));
                var UL = data.match(/url:.*?[\'\"](.*?)[\'\"]/)[1];
                if (UL.search(/\.m3u8|\.mp4/) != -1) {
                    return UL.replace('https://wy', 'http://wy') + "#isVideo=true#" + ';{Referer@' + myurl + '}';
                } else {
                    return refreshX5WebView(UL)
                };
            } else {
                var ifrsrc = pdfh(ohtml, "body&&iframe&&src");
                return refreshX5WebView(ifrsrc)
            }
        }
        //真不卡影视
        else if (/zhenbuka|ikandy/.test(myurl)) {
            if (fileExist('hiker://files/rules/js/global_香情真不卡.js')) {
                var jsnr = fetch('hiker://files/rules/js/global_香情真不卡.js', {});
                if (jsnr.indexOf('删掉') == -1) {
                    var zbkjs = '//本插件弃用，可以删掉了。';
                    writeFile("hiker://files/rules/js/global_香情真不卡.js", zbkjs);
                }
            }
            var phtml = fetch(srcurl, {
                headers: {
                    "User-Agent": MOBILE_UA
                }
            });
            if (phtml.indexOf('检测中') != -1) {
                let cook = JSON.parse(fetchCookie(srcurl, {
                            headers: {
                                "User-Agent": MOBILE_UA
                            }
                        })).join(';');
                phtml = fetch(srcurl + '?btwaf' + phtml.match(/btwaf(.*?)\"/)[1], {
                    headers: {
                        "User-Agent": MOBILE_UA,
                        "Cookie": cook
                    }
                });
            };
            var scrpt = pdfh(phtml, ".embed-responsive&&script&&Html");
            eval(scrpt);
            var fro = player_data.from;
            var urll = player_data.url;
            if (fro == 'niuxyun') {
                var one = fetch('https://good-vip.mmiyue.com/jiekou/zbk-bkby/jx.php?id=' + urll, {
                    headers: {
                        "Referer": myurl
                    },
                    method: "GET"
                }).match(/var u=\"(.*?)\"/)[1];
                var tow = fetch('https://good-vip.mmiyue.com/jiekou/zbk-bkby/' + one, {
                    headers: {
                        "Referer": myurl
                    },
                    method: "GET"
                });
                return tow.match(/url: \"(.*?)\"/)[1];
            } else if (fro == 'bkm3u8') {
                var link = JSON.parse(request('https://good-vip.mmiyue.com/zhenbuka2/api/dymp4.php?video_id=' + urll, {
                            headers: {
                                'Referer': myurl
                            },
                            redirect: false,
                            withHeaders: true
                        })).headers.location[0];
                return link + '#isVideo=true#';
            } else if (urll.indexOf('m3u8') != -1) {
                return urll;
            } else {
                var jiek = fetch(myurl + '/static/player/' + fro + '.js?v=' + new Date()
                        .getTime() + '', {
                        headers: {
                            "User-Agent": MOBILE_UA
                        }
                    }).match(/src=\"(.*?)\"/)[1].split("'")[0];
                if (jiek != '') {
                    if (jiek.substring(0, 4) == 'http') {
                        jiek = jiek;
                    } else if (jiek.substring(0, 2) == '\/\/') {
                        jiek = 'https:' + jiek;
                    } else {
                        jiek = myurl + jiek
                    }
                }
                //refreshX5WebView(jiek+urll);return 'toast://切换选集成功，请等待加载播放框架。'
                return x5rule(jiek + urll, srcurl)
            }
        }

        //4K鸭
        else if (/netflix/.test(myurl)) {
            var phtml = fetch(srcurl, {
                headers: {
                    "User-Agent": MOBILE_UA,
                    "Referer": myurl
                }
            });
            var scrpt = pdfh(phtml, ".player-box-main&&script&&Html").replace(/player_.*?={/, 'player_data={');
            eval(scrpt);
            var fro = player_data.from;
            var urll = unescape(player_data.url);
            if (player_data.encrypt == '1') {
                urll = unescape(urll);
            } else if (player_data.encrypt == '2') {
                urll = unescape(base64Decode(urll));
            };
            var jvs = parseDom(phtml, ".player-box-main&&script,1&&src");
            eval(request(jvs, {}));
            var jiek = '';
            if (MacPlayerConfig.player_list[fro].ps == "1") {
                jiek = MacPlayerConfig.player_list[fro].parse == '' ? MacPlayerConfig.parse : MacPlayerConfig.player_list[fro].parse;
            } else {
                return urll
            };
            return x5rule(jiek + urll, srcurl);
        }
        //骚火
        else if (/saohuo|dm84/.test(myurl)) {
            var phtml = request(srcurl);
            var src = pd(phtml, "body&&iframe&&src");
            if (/api\.hhplayer/.test(src)) {
                var psurl = 'https://api.hhplayer.com/api.php';
            } else if (/play\.hhplayer/.test(src)) {
                var psurl = 'https://play.hhplayer.com/hhjx/api.php'
            }
            var cc = pdfh(request(src, {}), 'body&&script,0&&Html').split('endebug()\;')[1].split('var act')[0];
            eval(cc);
            var cs = 'url=' + url + '&t=' + t + '&key=' + key + '&act=0&play=1';
            var fc = fetch(psurl, {
                headers: {
                    'User-Agent': MOBILE_UA,
                    'referer': 'https://api.hhplayer.com'
                },
                body: cs,
                method: 'POST'
            });
            var playlink = JSON.parse(fc).url;
            if (/obj\/tos/.test(playlink)) {
                return playlink + '#isVideo=true#';
            } else {
                return (playlink.indexOf('http') != -1 ? playlink : 'https://api.hhplayer.com' + playlink) + '#isVideo=true#'
            }
        }
        //auete&80dvd&袋鼠
        else if (/auete/.test(myurl)) {
            var phtml = fetch(srcurl, {
                headers: {
                    "User-Agent": MOBILE_UA,
                    "Sec-Fetch-Site": "none",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document"
                }
            });
            var scrpt = pdfh(phtml, "#player||#video||.player||.hy-player&&script&&Html").replace(/base64decode/g, "base64Decode");
            eval(scrpt);
            var urll = now;
            var fro = pn;
            if (/\.m3u8|\.mp4|obj\/tos/.test(urll) && /http/.test(urll)) {
                return urll + '#isVideo=true#';
            } else {
                var parnet='https://datas-s8pwfqdu9yystn90fb----------------cache.haozhansou.com/'+now;
                return cacheM3u8(parnet);
            }
        }
        //大师兄&BD电影&思古&爱迪&极品&迪迪&九州&饭团
        else if (/dsxys|jpys|unss|xifanys|kanju77|vipmv|cccu|haokanju|yingkuya|98bbw|1090ys|miniku|1080p|ysgc|guapi|ikuwoo|ak1080|tkznp|4kcz|smdyy|tegouys|lekkan|gfysys/.test(myurl)) {
            var phtml = fetch(srcurl, {
                headers: {
                    "User-Agent": MOBILE_UA,
                    "Sec-Fetch-Site": "none",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document"
                }
            });
            if (phtml.indexOf('检测中') != -1) {
                let cook = JSON.parse(fetchCookie(srcurl, {
                            headers: {
                                "User-Agent": MOBILE_UA
                            }
                        })).join(';');
                phtml = fetch(srcurl + '?btwaf' + phtml.match(/btwaf(.*?)\"/)[1], {
                    headers: {
                        "User-Agent": MOBILE_UA,
                        "Cookie": cook
                    }
                });
            };
            //var scrpt = pdfh(phtml,".leo-player||.embed-responsive||.stui-player__video||.myui-player__video||.myui-player__item||#bofang_box||.player-box-main&&script&&Html").replace(/player_.*?={/,'player_data={');
            var scrpt = ('var player' + phtml.split('>var player')[1].split('</script>')[0]).replace(/player_.*?={/, 'player_data={');
            eval(scrpt);
            var fro = player_data.from;
            var urll = player_data.url;
            var nxt = myurl + player_data.link_next;
            if (player_data.encrypt == '1') {
                urll = unescape(urll);
            } else if (player_data.encrypt == '2') {
                urll = unescape(base64Decode(urll));
            } else if (player_data.encrypt == '3') {
               if(/juhaokan/.test(myurl)){
                urll = getrandom(urll);
                }
            }
            //打开直链
            if (/\.m3u8|\.mp4|obj\/tos/.test(urll) && /http/.test(urll)) {
                if (/bigmao/.test(urll)) {
                    return urll + ';{Referer@' + myurl + '}' + '#isVideo=true#';
                } else if (/wkfile/.test(urll)) {
                    return urll + ';{Referer@https://qian.wkfile.com}'
                } else if (fro.search(/duoduozy/) != -1) {
                    //var duoduo='https://bo.movie06.com/ddplay/?url='+urll;
                    return x5rule(srcurl, srcurl);
                } else {
                    return unescape(urll) + '#isVideo=true#'
                }
            } else if (/youbo/.test(fro) && /98bbw/.test(myurl)) {
                return x5rule(srcurl, srcurl);
            }
            //直接网页解析的
            else if (/1231d/.test(myurl)) {
                return x5rule(srcurl, srcurl);
            }
            //爱迪天赐网络
            else if (/atHiRa0nccHiMw6aLnyg9lhuao/.test(urll)) {
                var tcwl = 'aHR0cHM6Ly9ha' + urll.slice(26).replace(/O0O0O/g, '=');
                return base64Decode(tcwl);
            }
            //加自带接口
            else {
                var jconf = pd(phtml, ".leo-player||.embed-responsive||.stui-player__video||.myui-player__video||.myui-player__item||#bofang_box||.player-box-main&&script,1&&src");
                eval(request(jconf, {
                        headers: {
                            "Referer": myurl
                        }
                    }));
                if (MacPlayerConfig.player_list[fro].ps == "1") {
                    var jiek = MacPlayerConfig.player_list[fro].parse == '' ? MacPlayerConfig.parse : MacPlayerConfig.player_list[fro].parse;
                } else {
                    var jiek = request(myurl + '/static/player/' + fro + '.js', {}).match(/src=\"(.*?)\"/)[1].split("'")[0];
                }
                if (jiek != '') {
                    if (jiek.substring(0, 4) == 'http') {
                        jiek = jiek;
                    } else if (jiek.substring(0, 2) == '\/\/') {
                        jiek = 'https:' + jiek;
                    } else {
                        jiek = myurl + jiek
                    }
                }
                //setError(jiek+urll);
                if (/smdyy/.test(myurl)) {
                    return x5rule(jiek + player_data.url, srcurl);
                } else if(/miniku/.test(myurl)){
                    return refreshX5WebView(jiek + player_data.url);
                }else {
                 if(jiek.substring(0, 4) != 'http'){
                  return x5rule(srcurl, srcurl);
                 } else {
                    if (player_data.link_ != '') {
                    if(player_data.key){
                    var title = parseDomForHtml(html, 'head&&title&&Text');
                     if(player_data.tm){
                        return x5rule(jiek + urll + "&tm=" + player_data.tm + "&key=" + player_data.key+"&next=" + nxt + '&tittle=' + title.split("-")[0], srcurl);
                     }else{
                        return x5rule(jiek + urll + "&key=" + player_data.key+"&image=" + player_data.vod_data.vod_thumb+"&next=" + nxt + '&tittle=' + title.split("-")[0], srcurl);
                        }
                    }else{
                        return x5rule(jiek + urll + "&next=" + nxt, srcurl);
                      }
                    } else {
                        return x5rule(jiek + urll, srcurl)
                    }
                  }
                }
            }
            //结束加接口
        }
        //孤单&TVB云播&追剧
        else if (/tvyb0|9eguoyu|kkju|cokemv|libvio|zxzj|fantuanhd|citydy|juhuang|xmaomi|fositv|dianyi\.ng/.test(myurl)) {
            var phtml = fetch(srcurl, {
                headers: {
                    "User-Agent": MOBILE_UA,
                    "Sec-Fetch-Site": "none",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document"
                }
            });
            if (phtml.indexOf('检测中') != -1) {
                let cook = JSON.parse(fetchCookie(srcurl, {
                            headers: {
                                "User-Agent": MOBILE_UA
                            }
                        })).join(';');
                phtml = fetch(srcurl + '?btwaf' + phtml.match(/btwaf(.*?)\"/)[1], {
                    headers: {
                        "User-Agent": MOBILE_UA,
                        "Cookie": cook
                    }
                });
            };
            //var scrpt = pdfh(phtml,".dt-info-header-wap||.leo-player||.embed-responsive||.stui-player__video||.myui-player__video||.myui-player__item||#bofang_box||.player-box-main&&script&&Html").replace(/player_.*?={/,'player_data={');
            //var scrpt=phtml.match(/var player_.*?\}/)[0].replace(/player_.*?={/,'player_data={');
            var scrpt = ('var player' + phtml.split('>var player')[1].split('</script>')[0]).replace(/player_.*?={/, 'player_data={');
            eval(scrpt);
            var fro = player_data.from;
            var urll = player_data.url;
            var nxt = myurl + player_data.link_next;
            if (player_data.encrypt == '1') {
                urll = unescape(urll);
            } else if (player_data.encrypt == '2') {
                urll = unescape(base64Decode(urll));
            }
            //setError(urll);
            //直链
            if (/.m3u8|.mp4|obj\/tos/.test(urll) && /http/.test(urll)) {
                if (urll.search(/cqzyw|GetDownUrlTx/) != -1) {
                    var ul = JSON.parse(fetch(urll, {
                                headers: {
                                    "User-Agent": "Dalvik/2.1.0",
                                    "Referer": myurl
                                },
                                redirect: false,
                                withHeaders: true
                            }));
                    if (ul.statusCode == "302") {
                        return ul.headers.location[0];
                    } else {
                        return urll
                    };
                } else if(/kkju/.test(myurl)){
                    return x5rule(srcurl, srcurl);
                }else {
                    return urll + '#isVideo=true#'
                };
            }
            //TVB云播直链
            //else if(/tvyb0/.test(myurl)&&/hkm3u8|renrenmi/.test(fro)){return srcurl;}
            else if (/aliyundrive/.test(urll)) {
                return urll;
            } else if (/pan\.baidu\.com|pan\.xunlei\.com/.test(urll)) {
                return urll;
            } else if(/iframe|line3|lep|ty[\d+]/.test(fro)&&/libvio|zxzj/.test(myurl)){
                            var ifrwy = fetch(urll, {
                                headers: {
                                    "User-Agent": MOBILE_UA,
                                    "Referer": myurl
                                }
                            });
                            //log(ifrwy);
                            let code = ifrwy.match(/var url = '(.*?)'/)[1].split('').reverse().join('')
                            let temp = ''
                            for (let i = 0x0; i < code.length; i = i + 0x2) {
                                temp += String.fromCharCode(parseInt(code[i] + code[i + 0x1], 0x10))
                            }
                            return temp.substring(0x0, (temp.length - 0x6) / 0x2) + temp.substring((temp.length - 0x6) / 0x2 + 0x6);
            
            } else if(/juhuang/.test(myurl)){
            var jiek = 'https://web-webapi-tsjqsvyzyx.cn-shenzhen.fcapp.run/?url=';
            return JSON.parse(request(jiek + encodeURIComponent(base64Decode(urll)),{})).play_url;            
            }else {
                eval(request(myurl + '/static/js/playerconfig.js', {
                        headers: {
                            "Referer": myurl
                        }
                    }));
                if (MacPlayerConfig.player_list[fro].ps == "1") {
                    var jiek = MacPlayerConfig.player_list[fro].parse == '' ? MacPlayerConfig.parse : MacPlayerConfig.player_list[fro].parse;
                } else {
                    var jiek = request(myurl + '/static/player/' + fro + '.js', {}).match(/src=\"(.*?)\"/)[1].split("'")[0];
                }
                if (jiek != '') {
                    if (jiek.substring(0, 4) == 'http') {
                        jiek = jiek;
                    } else if (jiek.substring(0, 2) == '\/\/') {
                        jiek = 'https:' + jiek;
                    } else {
                        jiek = myurl + jiek
                    }
                }
                //setError(jiek+urll+"&next="+nxt);
                 if(jiek.substring(0, 4) != 'http'){
                   return x5rule(srcurl, srcurl);
                 } else if(/fantuanhd|citydy/.test(myurl)){
                   return x5rule(jiek + urll + "&next=" + player_data.link_next +"&id="+player_data.id+"&nid="+player_data.nid+"&from="+player_data.from, srcurl);
                 }else {
                   if (player_data.link_next != '') {
                    return x5rule(jiek + urll + "&next=" + nxt, srcurl);
                   } else {
                    return x5rule(jiek + urll, srcurl);
                   }
                }
            }
        }
        
        //打开源链接
        else {
            return srcurl
        }
    } catch (e) {
        log('报错打开原网页');
        return srcurl
    }
}

//预处理代码
function hikerpre() {
    setItem('huadong', base64Decode('ZnVuY3Rpb24gc3RyaW5ndG9IZXgoYWNTVFIpIHsKICAgIHZhciB2YWwgPSAiIjsKICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGFjU1RSLmxlbmd0aCAtIDE7IGkrKykgewogICAgICAgIHZhciBzdHIgPSBhY1NUUi5jaGFyQXQoaSk7CiAgICAgICAgdmFyIGNvZGUgPSBzdHIuY2hhckNvZGVBdCgpOwogICAgICAgIHZhbCArPSBwYXJzZUludChjb2RlKSArIDEKICAgIH07CiAgICByZXR1cm4gdmFsCn07CgpmdW5jdGlvbiBtZDVlbmNvZGUod29yZCkgewogICAgcmV0dXJuIG1kNSh3b3JkKS50b1N0cmluZygpCn07CmxldCBqc3AgPSBwYXJzZURvbUZvckh0bWwoaHRtbCwgJ3NjcmlwdCYmc3JjJyk7CmxldCBqc2YgPSByZXF1ZXN0KCdyZWZyZScranNwLCB7CiAgICBoZWFkZXJzOiB7CiAgICAgICAgIlVzZXItQWdlbnQiOiBNT0JJTEVfVUEsCiAgICAgICAgIlJlZmVyZXIiOiAicmVmcmUiCiAgICB9Cn0pOwpldmFsKGpzZi5tYXRjaCgva2V5PSJbXlwiXSsiLHZhbHVlPSJbXlwiXSsiLylbMF0pOwpldmFsKCJsZXQgaHVybD0ncmVmcmUnKyIgKyBqc2YubWF0Y2goLyJjb21wbGV0ZSIsZnVuY3Rpb25cKFwpXHtjXC5nZXRcKChbXixdKyksLylbMV0pOwp2YXIgY29rID0gSlNPTi5wYXJzZShmZXRjaENvb2tpZShodXJsLCB7CiAgICBoZWFkZXJzOiB7CiAgICAgICAgIlVzZXItQWdlbnQiOiBNT0JJTEVfVUEsCiAgICAgICAgIlJlZmVyZXIiOiAicmVmcmUiCiAgICB9Cn0pKVswXTs='));
}
