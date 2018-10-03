/* Immutable 내부 함수 */
/*
const { Map, fromJS } = Immutable;

const data = Map({
  a: 1,
  b: 2,
  c: Map({
      d: 3,
      e: 4,
      f: 5
  })
});

console.log(data);

// JS 객체로 변환
const deserialized = data.toJS();
console.log(deserialized);

// 특정 키 값 불러오기 
data.get('a'); // 1
console.log(data.get('a'));

// 깊숙이 위치하는 값 불러오기
data.getIn(['c', 'd']); // 3
console.log(data.getIn(['c', 'd']));

// 값 설정
console.log("oldData : " + data); // "oldData : Map { \"a\": 1, \"b\": 2, \"c\": Map { \"d\": 3, \"e\": 4, \"f\": 5 } }"
const newData = data.set('a', 4); // "newData : Map { \"a\": 4, \"b\": 2, \"c\": Map { \"d\": 3, \"e\": 4, \"f\": 5 } }"
console.log("newData : " + newData);
console.log("newdata === data : " + newData === data);

// 깊숙이 위치하는 값 수정
const newData1 = data.setIn(['c', 'd'], 10);
console.log("newData1 : " + newData1);
// "newData1 : Map { \"a\": 1, \"b\": 2, \"c\": Map { \"d\": 10, \"e\": 4, \"f\": 5 } }"

// 여러 값 동시에 설정

const newData2 = data.mergeIn(['c'], { d: 10, e:10 });
console.log("newData2 : " + newData2);
// "newData2 : Map { \"a\": 1, \"b\": 2, \"c\": Map { \"d\": 10, \"e\": 10, \"f\": 5 } }"

const newData3 = data.setIn(['c', 'd'], 10)
                     .setIn(['c', 'e'], 10);

const newData4 = data.merge({ a: 10, b: 10});
console.log("newData4 : "+ newData4);
*/


/* List */
// const { List } = Immutable;
// const list = List([0,1,2,3,4]);

const { List, Map, fromJS } = Immutable;
const list = List([
  Map({ value: 1}),
  Map({ value: 2})
]);

// or

const list2 = fromJS([
  { value: 1},
  { value: 2}
]);

console.log(list.toJS());

// 값 읽어오기
list.get(0);
list.getIn([0, 'value']);
console.log("list get : "+ list.get(0));

// 아이템 수정
//const newList = list.set(0, Map({value: 10}))
//const newList1 = list.setIn([0, 'value'], 10);
// const newList2 = list.update(0, item => item.set('value', item.get('value') * 5))
//const newList3 = list.setIn([0, 'value'], list.getIn([0, 'value'] * 5));



// 아이템 추가
const newListAdd = list.push(Map({value: 3}))
console.log("newListAdd : " + newListAdd);
// 맨앞에 아이템 추가
const newListAdd1 = list.unshift(Map({value: 0}));
console.log("newListAdd1 : " + newListAdd1);

// 아이템 제거
const newListDel = list.delete(1);
console.log("newListDel : " + newListDel); // 인덱스가 1인 아이템 삭제
// const newList = list.pop();

// List 크기 및 isEmpty
console.log(list.size);
list.isEmpty();