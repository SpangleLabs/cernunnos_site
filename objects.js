/**
 * Created by JCOA on 15/06/2017.
 */
function ViewObj(){}
ViewObj.prototype.list = ListObj;
ViewObj.prototype.diary = DiaryObj;

function ListObj(){}
ListObj.prototype.categories = [CategoryObj];

function CategoryObj(){}
CategoryObj.prototype.subCategories = [CategoryObj];
CategoryObj.prototype.tasks = [TaskObj];
CategoryObj.prototype.addSubcategory = function (subCategory) {

};

function TaskObj(){}
TaskObj.prototype.name = "name";

function DiaryObj(){}
DiaryObj.prototype.days = [DiaryDayObj];

function DiaryDayObj(){}