/**
 * 单向链表
 * @Node 链表节点
 * @singlyLinkedList 链表操作
 */

class singlyLinkedList {
  createNode(value) {
    return {
      value,
      next: null
    };
  }
  createHead(value) {
    return this.createNode(value);
  }
  // 插入节点
  insert(head, value, startNumber) {
    if (startNumber < 0) {
      return insertReverse(head, value, -startNumber);
    }
    let tempN = 1;
    let node = head;
    if (startNumber === 0) {
      let tempNode = this.createNode(value);
      tempNode.next = head;
      head = tempNode;
      return;
    }
    while (tempN !== startNumber && node.next !== null) {
      node = node.next;
      tempN += 1;
    }
    let tempNode = this.createNode(value);
    tempNode.next = node.next;
    node.next = tempNode;
  }
  // 倒数插入节点
  insertReverse(head, value, n) {
    if (n < 0) {
      throw new Error("超出处理范围");
    }
    let node = head;
    let ReversenNode = head;
    let TempN = 0;
    while (node.next !== null) {
      node = node.next;
      if (TempN === n) {
        ReversenNode = ReversenNode.next;
      } else {
        TempN++;
      }
    }
    if (TempN === n) {
      let tempNode = this.createNode(value);
      tempNode.next = ReversenNode.next;
      ReversenNode.next = tempNode;
      this.ergodic(head);
      return true;
    } else {
      return false;
    }
  }
  // 遍历节点
  ergodic(head) {
    let node = head;
    while (node !== null) {
      console.log(node.value);
      node = node.next;
    }
  }
  // 删除第 n 个节点
  deleteList(head, n) {
    if (n === 0) {
      head = head.next;
      return;
    }
    if (n < 0) {
      deleteListReverse(head, -n);
    }
    let node = head;
    let tempN = 0;
    while (tempN < n - 1 && node.next !== null) {
      node = node.next;
      tempN += 1;
    }
    if (tempN == n - 1 && node.next !== null) {
      node.next = node.next.next;
    }
  }
  // 删除倒数 n 个数据
  deleteListReverse(head, n) {
    if (n < 1) {
      throw new Error("超出处理范围");
    }
    let node = head;
    let ReversenNode = head;
    let TempN = 0;
    while (node.next !== null) {
      node = node.next;
      if (TempN === n) {
        ReversenNode = ReversenNode.next;
      } else {
        TempN++;
      }
    }
    if (TempN === n) {
      let tempNext = ReversenNode.next;
      ReversenNode.next = tempNext.next;
      ergodic(head);
      return tempNext;
    } else {
      return false;
    }
  }
  // 反转
  reverse(head) {
    let temp = head.next;
    head.next = null;
    while (temp !== null) {
      insert(head, temp.value, 0);
      temp = temp.next;
    }
  }
  // 查找中间节点
  findMiddleNode(head) {
    let middleNode = head;
    let node = head;
    let tempN = 0;
    while (node !== null) {
      if (tempN == 2) {
        tempN = 0;
        middleNode = middleNode.next;
      }
      tempN += 1;
      node = node.next;
    }
    return middleNode;
  }
  // 合并有序列表，合并后同样有序
  concatOrderedList(head1, head2) {
    //   假设链表按从小到大正序排序
    let head, node, node1, node2;
    if (head1.value <= head2.value) {
      head = this.createNode(head1.value);
      node1 = head1.next;
      node2 = head2;
    } else {
      head = this.createNode(head2.value);
      node1 = head2.next;
      node2 = head1;
    }
    node = head;

    while (node1 !== null || node2 !== null) {
      if ((node1 && !node2) || (node1 && node1.value <= node2.value)) {
        node.next = this.createNode(node1.value);
        node1 = node1.next;
      } else {
        node.next = this.createNode(node2.value);
        node2 = node2.next;
      }
      node = node.next;
    }
    // this.ergodic(head);
    return head;
  }
  // 检测环
  checkRing(head) {
    let node1 = head;
    let node2 = head;
    let isRing = false;
    while (node1 !== null && node2 !== null) {
      node1 = node1.next;
      node2 = node2.next ? node2.next.next : null;
      if (node2 == node1) {
        isRing = true;
        break;
      }
    }
    return isRing;
  }
}

const link = new singlyLinkedList();

// let linkHead = link.createHead("aaa");
// link.insert(linkHead, "bbb");
// link.insert(linkHead, "ccc");
// link.insert(linkHead, "ddd");
// link.insert(linkHead, "eee");
// link.insertReverse(linkHead, "fff", 1);
// link.insertReverse(linkHead, "ggg", 0);

// let linkHeada = link.createHead(1);
// link.insert(linkHeada, 2);
// link.insert(linkHeada, 5);
// link.insert(linkHeada, 7);
// link.insert(linkHeada, 9);

// let linkHeadb = link.createHead(1);
// link.insert(linkHeadb, 3);
// link.insert(linkHeadb, 4);
// link.insert(linkHeadb, 7);
// link.insert(linkHeadb, 8);

// // link.ergodic(linkHeada);
// // link.ergodic(linkHeadb);

// let newHead = link.concatOrderedList(linkHeadb, linkHeada);
// link.ergodic(newHead);

let linkHead = link.createHead(1);

let ling1 = link.createNode(2);
let ling2 = link.createNode(3);
let ling3 = link.createNode(4);
let ling4 = link.createNode(5);
let ling5 = link.createNode(6);
let ling6 = link.createNode(7);
let ling7 = link.createNode(8);
linkHead.next = ling1;
ling1.next = ling2;
ling2.next = ling3;
ling3.next = ling4;
ling4.next = ling5;
ling5.next = ling6;
ling6.next = ling7;
ling7.next = ling4;

// link.ergodic(linkHead);
console.log(link.checkRing(linkHead));
