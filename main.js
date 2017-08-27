const query = require('cli-interact');
//添加学生信息
function addStudent(stuInfo) {
    let arr = stuInfo.split(',').join(";").split(":");
    let stuList = [];
    let currentName = arr[0];
    stuList.push({
        name: currentName,
        id: arr[1],
        grade: arr[2],
        subject: [
            { key: '数学', score: parseInt(arr[4])},
            { key : '语文', score: parseInt(arr[6])},
            { key: '英语', score:  parseInt(arr[8])},
            {key: '编程', score: parseInt(arr[10])}
        ],
    });
    console.log('学生${currentName}的成绩被添加');
    return stuList;
}
//得到全班的总分平均分和中位数
function getClassAverage(stuList) {
    let total_arr = [];
    stuList.forEach(item => {
        //let item_total = item.subject[0].score + item.subject[1].score + item.subject[2].score +item.subject[3].score;
        total_arr.push(item.subject[0].score);
        total_arr.push(item.subject[1].score);
        total_arr.push(item.subject[2].score);
        total_arr.push(item.subject[3].score);
    });
    let median =getMedian(total_arr);
    let total = total_arr.reduce((a, b) => {
        return a + b;
    });
    let average = total / total_arr.length;
  return [average, median];
}
//得到全班的总分中位数
function getMedian(total_arr) {
 let median ;
  total_arr.sort((a, b) => {
       return a - b;
   });
  let len = total_arr.length;
  if (len % 2 == 0) {
      median = (total_arr[len / 2] + total_arr[len / 2 - 1])/ 2;
  }else {
      median = total_arr[(len - 1) / 2];
  }
  return median;
}
//得到指定学生的成绩
function getStuScore( id, stuList) {
    let stu_arr = [];
    stuList.forEach(item => {
      let  total = item.subject[0].score + item.subject[1].score + item.subject[2].score +item.subject[3].score;
      let aver = total / 4;
      if (item.id === id) {
           stu_arr.push({
               name: item.name,
               id: item.id,
               math: item.subject[0].score,
               chinese: item.subject[1].score,
               english: item.subject[2].score,
               programming: item.subject[3].score,
               average: aver,
               total: total
           });
        }
    });
    return stu_arr;
}
//打印指定同学的成绩单
function printScoreCard(stu_arr, stulist) {
    // stu_arr = getStuScore(id, stulist);
    let [average, median] = getClassAverage(stulist);
    let score_title = ' 成绩单\n 姓名|数学|语文|英语|编程|平均分|总分\n ========================';
    let score_mid = '';
    stu_arr.map(item => {
       score_mid += '${item.name}|${item..math}|${item.chinese}|${item.english}|${item.programming}|${item.average}|${item.total}\n'
    });
    let score_bottom = ` ========================\n
    全班总分平均数：${average}\n
    全班总分中位数：${median}`;
    let score_card = score_title + score_mid + score_bottom;
    console.log(score_card);
    //return score_card;
}
function checkStuInfo(stuInfo) {
    let regex = /^[\u4e00-\u9fa5]+,\d+,\d+,\d+,\d+,\d+,\d+$/;
    let match = regex.test(stuInfo);
    return match;
}
function main() {
    let stulist = [];
    console.log(` 1. 添加学生\n 2. 生成成绩单\n 3. 退出\n`);
    let listNum = query.getNumber('请输入你的选择（1～3）：');
    console.log(listNum);
    if (listNum === 1 ) {
        let stuInfo = query.question('请输入学生信息（格式：姓名, 学号, 班级, 学科: 成绩, ...），按回车提交：');
        if (checkStuInfo(stuInfo)) {
            console.log(' 请按正确的格式输入（格式：姓名, 学号, 班级, 学科: 成绩, ...）：');
        }
        stulist.push(addStudent(stuInfo));
        return;
    }
    if (listNum === 2) {
        let id = query.question(`请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`);
        if (typeof id !== 'number') {
            console.log('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：')
        }
        let stu_arr = getStuScore(id, stulist);
        printScoreCard(stu_arr, stulist);
        return;
    }
    if (listNum == 3) {
        console.log('正在退出....');
        return;
    }

}
main();
module.exports = {
    main,
    addStudent,
    getStuScore,
    printScoreCard
};
