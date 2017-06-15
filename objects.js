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

    var __construct = function () {
        $.get(config.apiUrl + "/categories/", function (data) {
            data.forEach(function (category) {
                this.addCategory(category);
            })
        })
    }();

    this.addCategory = function (category) {
        this.categories.push(category);
    }
}

function CategoryObj() {
    this.subCategories = [];
    this.tasks = [];
    this.addSubcategory = function (subCategory) {

    }
}

function TaskObj() {
    this.name = "name";
}

function DiaryObj() {
    this.days = [];
    this.viewManual = true;
    this.viewAuto = true;
    //TODO init from API
}

function DiaryDayObj() {

}