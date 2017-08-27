const main= require("./main");

describe('测试打印成绩单', () => {

    it('添加学生信息', () => {
        let input = "魏美丽, 001, 002, 数学: 90，语文: 85, 英语: 95, 编程: 88";
        let result = main.addStudent(input);
        let expect_text = [{
            name: "魏美丽",
            id: '001',
            grade: '002',
            subject:[{key: '数学', score: 90},
                     {key: '语文', score: 85},
                     {key: '英语', score: 95},
                     {key: '编程', score: 88}]
        }];
        expect(result).toEqual(expect_text);
    });
    it('得到指定学生的信息', () => {
        let stuList = [
            {   name: "魏美丽",
                id: '001',
                grade: '002',
                subject:[{key: '数学', score: 90},
                         {key: '语文', score: 85},
                         {key: '英语', score: 95},
                         {key: '编程', score: 88}
                         ]
            },
            {   name: "小明",
                id: '002',
                grade: '002',
                subject:[{key: '数学', score: 99},
                    {key: '语文', score: 85},
                    {key: '英语', score: 90},
                    {key: '编程', score: 90}]
            }
        ];
        let result = main.getStuScore('001', stulist);
        let expect_text = [
            {   name: '魏美丽',
                id: '001',
                math: 90,
                chinese: 85,
                english: 95,
                programming: 88,
                average: 89.5,
                total: 358
            }
        ];
        expect(result).toEqual(expect_text);
    });
    it('打印指定学生的信息', () => {
        let stuList = [
            {   name: "魏美丽",
                id: '001',
                grade: '002',
                subject:[{key: '数学', score: 90},
                    {key: '语文', score: 85},
                    {key: '英语', score: 95},
                    {key: '编程', score: 88}
                ]
            },
            {   name: "小明",
                id: '002',
                grade: '002',
                subject:[{key: '数学', score: 99},
                    {key: '语文', score: 85},
                    {key: '英语', score: 90},
                    {key: '编程', score: 90}]
            }
        ];
        spyOn(console, 'log');
        let stu_arr = main.getStuScore('001', stuList);
        main.printScoreCard(stu_arr, stuList);
        let expect_text = `成绩单
        姓名|数学|语文|英语|编程|平均分|总分
        ========================
        魏美丽|90|85|95|88|89.5|358
        ========================
        全班总分平均数：90.25
        全班总分中位数：90`;
        expect(console.log).to.be.calledWith(expect_text);
    });
});
