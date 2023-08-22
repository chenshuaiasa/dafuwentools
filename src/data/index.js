import { createClient } from '@supabase/supabase-js'

// 初始化memfiredb数据库实例

const supabaseJs2 = createClient(
    "https://cj7p10q5g6h0rqlbcl60.baseapi.memfiredb.com",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzIyOTI0NDU0NywiaWF0IjoxNjkxMzI0NTQ3LCJpc3MiOiJzdXBhYmFzZSJ9.8_QqAuys0lyhsCCBfqDh919lGpmIpWzzYxausRHgZZQ"
);


async function getPlayerInfo(column, val, colunms1) {
    if (column == undefined) column = '';
    if (val == undefined) val = '';
    const { data, error } = await supabaseJs2
        .from("playerinfo")
        .select(colunms1)
        .order('id', { ascending: true })
        .eq(column, val);
    return data;
}

async function getPropertyInfo_from_player(column, val) {
    if (column == undefined) {
        const { data, error } = await supabaseJs2
            .from("property_detail")
            .select()
            .order('id', { ascending: true });
        return data;
    } else {
        const { data, error } = await supabaseJs2
            .from("property_detail")
            .select()
            .order('id', { ascending: true })
            .in(column, val);
        return data;
    }

}

async function getTransferHis(column, val) {
    if (column == undefined) val = '';
    if (val == undefined) column = '';
    const { data, error } = await supabaseJs2
        .from("transfer_history")
        .select()
        .order('id', { ascending: true })
        .in(column, val);
    return data;
}

async function insert_transfer_history(data) {
    const { error } = await supabaseJs2
        .from('transfer_history')
        .insert([data])
}

async function update_playerinfo(data, column, value) {
    const { error } = await supabaseJs2
        .from('playerinfo')
        .update(data)
        .eq(column, value)
}

async function update_PropertyInfo(data, column, value) {
    const { error } = await supabaseJs2
        .from('property_detail')
        .update(data)
        .eq(column, value)
}


function timeCode() {
    var nowdate = new Date();
    var year = nowdate.getFullYear(),
        month = nowdate.getMonth() + 1,
        date = nowdate.getDate(),
        h = nowdate.getHours(),
        m = nowdate.getMinutes(),
        s = nowdate.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    return year + '-' + month + '-' + date + ' ' + h + ':' + m + ':' + s
}

function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i
}

function giveProperty(playerinfo, propertyinfo) {

    // console.log('submit' + values);
    //1 更新property_detail 地产状态-1且拥有者为id
    // console.log('??')

    var P_h = ['P1', 'P2', 'P3', 'P4']
    //2 更新playerinfo 用户的房屋情况，同时要计算房屋等级-同色块
    // var house = [{}];
    var cid = [];
    var pro = [];
    if (playerinfo.property == null) {
        cid.push({ cid: propertyinfo.classification, num: 1 });
        pro.push(propertyinfo);
        update_PropertyInfo({ state: -1, belong_to: playerinfo.id }, 'id', propertyinfo.property_id)
    } else {
        console.log(playerinfo)
        playerinfo.property.classification.forEach((val) => {
            if (propertyinfo.classification == val.cid) {
                cid.push({ cid: val.cid, num: val.num + 1 });
            } else {
                cid.push(val);
                cid.push({ cid: propertyinfo.classification, num: 1 });
            }
        });
        playerinfo.property.propertys.push(propertyinfo);

        playerinfo.property.propertys.forEach((v) => {
            cid.forEach((val) => {
                if (val.cid == v.classification) {
                    if (v.house_level.substring(0, 1) == 'H') {
                        pro.push(v);
                    } else {
                        pro.push({ property_id: v.property_id, classification: v.classification, house_level: P_h[val.num - 1], house_num: 0 ,state:-1})
                    }
                }
            });
        });
        update_PropertyInfo({ state: -1, belong_to: playerinfo.id }, 'id', propertyinfo.property_id)
    }
    console.log(cid);
    console.log(pro);
    update_playerinfo({ property: { classification: cid, propertys: pro } }, 'id', playerinfo.id);
}

function initGame(propertyinfo) {
    // console.log(this.propertyinfo)
    for (var i = 1; i <= 6; i++) {
        update_playerinfo({ balance: 15000, property: null, state: 1, password: null, }, 'id', i)
    }
    propertyinfo.forEach(val => {
        update_PropertyInfo({ state: 1, belong_to: null }, 'id', val.id);
    });
}

function initGameplayer(playerinfo) {
    // console.log(this.propertyinfo)
    update_playerinfo({ property: null }, 'id', playerinfo.id)

    playerinfo.property.propertys.forEach(val => {
        update_PropertyInfo({ state: 1, belong_to: null }, 'id', val.property_id);
    });
}

async function buyhouse(playerinfo, pid) {
    var housenum = {
        "P1": 0, "P2": 0, "P3": 0,
        "H1": 1,
        "H2": 2,
        "H3": 3,
        "H4": 4,
        "H5": 5,
    };
    //1 判断可不可以买房子
    var temp_property = '';
    var tempcids = [];
    var p = await getPropertyInfo_from_player();
    p.forEach((val) => {
        if (val.property_name == pid) {
            pid = val.id;
            temp_property = val;
        }
    })
    console.log(pid);

    var count = 0;
    var pmoney = 0;
    var num = 0;
    var property_now_from_player = 0;
    // var temp_property = '';
    playerinfo.property.propertys.forEach((val) => {
        if (val.property_id == pid) {
            num = val.house_num;
            property_now_from_player = val;

        } else if (val.classification == temp_property.classification) {
            tempcids.push({ id: val.property_id, hn: val.house_num })
        }
    })
    p.forEach((val) => {
        if (val.classification == temp_property.classification) {
            count++;
            //temp_property = val;
        }
        if (val.id == pid) {
            if (num == 5) {
                pmoney = val.build_hotel_price;
            } else {
                pmoney = val.build_house_price;
            }
        }
    })
    var pnum = 0;//统计土地数量
    console.log('count' + count)
    //1.1 同色块地是否集齐
    var flag1 = [false];
    playerinfo.property.classification.forEach((val) => {
        if (val.cid == temp_property.classification) {
            if (val.num == count) {
                flag1[0] = true;
            }
            pnum = val.num;
        }
    })
    flag1.push(false);
    //1.3 判断同色快其他地产至少有一个同数量或者多一个；
    var tempflag = 0;
    tempcids.forEach((val) => {
        if (pnum == 2) {
            if (val.hn == num || val.hn == num + 1) {
                flag1[flag1.length - 1] = true;
            }
        } else if (pnum == 3) {
            if (val.hn == num || val.hn == num + 1) {
                tempflag++;
            }
        }
    })
    if (pnum == 3) {
        flag1[1] = (tempflag == 2);
    }
    // 1.4 房子数量是否超过5个
    flag1.push(false);
    console.log('num' + num)
    if (num < 5) {
        flag1[flag1.length - 1] = true;
    }

    //1.5 判断房地产类型可不可以买房子
    flag1.push(false);
    if (temp_property.type == 0) {
        flag1[flag1.length - 1] = true;
    }
    //1.6 判断房子状态
    flag1.push(false);
    if(property_now_from_player.state != -2){
        flag1[flag1.length - 1] = true;
    }
    //2 判断钱够不够
    var flag2 = false;
    if (pmoney <= playerinfo.balance) {
        flag2 = true;
    }
    //3 买，更新房子等级
    var pp = []
    console.log('falg1' + flag1)
    console.log('falg2' + flag2)
    var balance = parseFloat(playerinfo.balance) - parseFloat(pmoney);

    if ((flag1.find(val=>{return val == false})==false?false:true) && flag2) {
        playerinfo.property.propertys.forEach((val) => {
            if (val.property_id == pid) {
                pp.push({
                    "property_id": val.property_id,
                    "classification": val.classification,
                    "house_level": 'H' + (housenum[val.house_level] + 1),
                    "house_num": housenum[val.house_level] + 1
                })
            } else {
                pp.push(val);
            }
        })
        console.log(pp);
        update_playerinfo({ property: { classification: playerinfo.property.classification, propertys: pp }, balance: balance }, 'id', playerinfo.id);
        return true
    }
    else {
        return false
    }
    return ((flag1.find(val=>{return val == false})==false?false:true) && flag2)
}


//卖房子
async function salehouse(playerinfo, pid) {
    //1 判断有没有房子
    var housenum = {
        "P1": 0, "P2": 0, "P3": 0,
        "H1": 1,
        "H2": 2,
        "H3": 3,
        "H4": 4,
        "H5": 5,
    };
    var housenum2 = {
        "P1": 0, "P2": 0,
        "H1": 1,
        "H2": 2,
        "H3": 3,
        "H4": 4,
        "H5": 5,
    };
    var hun = 0;
    var hm = [];
    var p = await getPropertyInfo_from_player();
    p.forEach((val) => {
        if (val.property_name == pid) {
            pid = val.id;
            hm[0] = val.build_house_price;
            hm[1] = val.build_hotel_price;
            // tempcid = val.classification;
        }
    })

    var pnum = 0;
    playerinfo.property.classification.forEach((val) => {
        pnum = val.num;
    })

    playerinfo.property.propertys.forEach((val) => {
        if (val.property_id == pid) {
            hun = val.house_num;
        }
    })
    var flag1 = false;
    var pp = [];
    if (hun >= 1) {
        flag1 = true;
    }
    //2 计算卖房子的价值
    var saleHousemoney = [parseInt(hm[0] / 2), parseInt(hm[1] / 2)];
    //3 更新用户的地产数据和余额数据

    if (flag1) {
        if (hun <= 4) {
            var balance = parseFloat(playerinfo.balance) + parseFloat(saleHousemoney[0]);
        } else {
            var balance = parseFloat(playerinfo.balance) + parseFloat(saleHousemoney[1]);
        }
        playerinfo.property.propertys.forEach((val) => {
            if (val.property_id == pid) {
                if (pnum == 2) {
                    pp.push({
                        "property_id": val.property_id,
                        "classification": val.classification,
                        "house_level": Object.keys(housenum)[[Object.keys(housenum2).indexOf(val.house_level)] - 1],
                        "house_num": housenum[val.house_level] - 1
                    })
                } else if (pnum == 3) {
                    pp.push({
                        "property_id": val.property_id,
                        "classification": val.classification,
                        "house_level": Object.keys(housenum)[[Object.keys(housenum).indexOf(val.house_level)] - 1],
                        "house_num": housenum[val.house_level] - 1
                    })
                }

            } else {
                pp.push(val);
            }
        })
        update_playerinfo({ property: { classification: playerinfo.property.classification, propertys: pp }, balance: balance }, 'id', playerinfo.id);
    }

    return flag1
}
// 抵押房产
async function pledgehouse(playerinfo, pid){
    //1 判断当前房产是否可以抵押
    //1.1 是否还有房子
    var ps = await getPropertyInfo_from_player();
    var property_now = ps.find(val=>{
        return val.property_name == pid;
    });

    var property_now_from_player = playerinfo.property.find(val=>{
        return val.property_id == property_now.id
    })
    var flag = [false];
    if(property_now_from_player.house_num == 0){
        flag[flag.length-1] = true;
    }
    //1.2 是否已抵押
    flag.push(false);
    if(property_now.state!=-2){
        flag[flag.length-1] = true;
    }

    //2 开始抵押过程
    //2.1 更改房屋状态-2
    update_PropertyInfo({ state: -2}, 'id', property_now.id);
    //2.2 更改用户的房屋状态为-2
    var pro =  playerinfo.property.map((val)=>{
        if(val.property_id == property_now_from_player)
            val.state = -2
        return val
    })
    update_playerinfo({ property: { classification: playerinfo.property.classification, propertys: pro}}, 'id', playerinfo.id);
    return (flag.find(val=>{return val == false})==false?false:true)
}   


export {
    getPlayerInfo,
    getPropertyInfo_from_player,
    insert_transfer_history,
    timeCode,
    update_playerinfo,
    getTransferHis,
    update_PropertyInfo,
    giveProperty,
    initGame,
    initGameplayer,
    buyhouse,
    salehouse,
    pledgehouse
}