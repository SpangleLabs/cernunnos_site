/**
 * Created by JCOA on 15/06/2017.
 */

function ViewObj() {
    this.list = new ListObj();
    this.diary = new DiaryObj();
}

function ListObj() {
    this.categories = [];
    this.viewDates = true;
    this.viewTags = true;

    var __construct = function (thi) {
        $.get(config.apiUrl + "/categories/", function (data) {
            data.forEach(function (categoryData) {
                var category = new CategoryObj(categoryData);
                thi.addCategory(category);
            })
        })
    }(this);

    this.addCategory = function (category) {
        this.categories.push(category);
        var categoryTpl = getTemplate("cer-template-category");
        var html = categoryTpl.map(render({
            "id": category.getCategoryId(),
            "name": category.getName(),
            "date": "YYYY-MM-DD", //TODO
            "tags": "🦌" //TODO
        })).join('');
        $("#cer-to-do-list").append(html);
        $("#cer-category-"+category.getCategoryId()).data("obj", category);
    };

    this.setViewDates = function (dates) {
        this.viewDates = dates;
        if(dates) {
            $(".cer-category-date").show(200);
        } else {
            $(".cer-category-date").hide(200);
        }
    };

    this.setViewTags = function (tags) {
        this.viewTags = tags;
        if(tags) {
            $(".cer-category-tags").show(200);
        } else {
            $(".cer-category-tags").hide(200);
        }
    };
}

function CategoryObj(categoryData) {
    this.categoryId = 0;
    this.subCategories = [];
    this.tasks = [];
    this.name = "";
    this.addSubcategory = function (subCategory) {

    };

    var __construct = function (thi, categoryData) {
        thi.categoryId = categoryData.category_id;
        thi.name = categoryData.name;
    }(this, categoryData);

    this.getName = function () {
        return this.name;
    };

    this.getCategoryId = function () {
        return this.categoryId;
    };

    this.expand = function () {
        console.log("Request to expand category "+this.categoryId);
        get(config.apiUrl+"/categories/"+this.categoryId).then(function (data) {
            console.log(data[0]);
            data[0].sub_categories.forEach(function (subCategoryData) {
                var subCategory = new CategoryObj(subCategoryData);
                $("#cer-category-"+data[0].category_id).append("Cat="+subCategory.getName());
            });
            data[0].tasks.forEach(function (taskData) {
                var task = new TaskObj(taskData);
                $("#cer-category-"+data[0].category_id).append("Task="+task.getName());
            })

        });
    }
}

function TaskObj() {
    this.name = "name";

    this.getName = function () {
        return this.name;
    }
}

function DiaryObj() {
    this.days = [];
    this.viewManual = true;
    this.viewAuto = true;
    //TODO init from API
}

function DiaryDayObj() {

}


// Useful methods
function getTemplate(name) {
    return $('script[data-template="'+name+'"]').text().split(/\${(.+?)}/g);
}
function render(props) {
    return function(tok, i) { return (i % 2) ? props[tok] : tok; };
}
function get(url) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function () {
            if (req.status === 200) {
                resolve(JSON.parse(req.response));
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(Error("Network Error"));
        };
        req.send();
    });
}