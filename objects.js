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
            data.forEach(function (categoryData) {
                var category = new CategoryObj(categoryData);
                this.addCategory(category);
            })
        })
    }();

    this.addCategory = function (category) {
        this.categories.push(category);
    };

    this.setViewDates = function (dates) {
        this.viewDates = dates;
        if(dates) {
            $(".cer-category-date").show();
        } else {
            $(".cer-category-date").hide();
        }
    };

    this.setViewTags = function (tags) {
        this.viewTags = tags;
        if(tags) {
            $(".cer-category-tags").show();
        } else {
            $(".cer-category-tags").hide();
        }
    };
}

function CategoryObj(categoryData) {
    this.subCategories = [];
    this.tasks = [];
    this.name = "";
    this.addSubcategory = function (subCategory) {

    };

    var __construct = function (categoryData) {
        this.name = categoryData.name;
    }(categoryData);
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