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
    if (head1.value < head2.value) {
      let temp = head2;
      head2 = head1;
      head1 = temp;
    }
    let lastHead = this.createNode(head1.value);
    let tempHead1 = lastHead;
    let tempNode1 = head1.next;
    while (tempNode1 !== null) {
      tempHead1.next = this.createNode(tempNode.value);
      tempHead1 = tempHead1.next;
      tempNode1 = tempNode1.next;
    }
    let tempNode2 = head2;
    let tempHead2 = lastHead;
    while (tempNode2 !== null) {
      if (tempNode2.value <= tempHead2.value) {
      }
    }
  }
  // 检测环
  checkRing(head) {}
}

const link = new singlyLinkedList();

let linkHead = link.createHead("aaa");
link.insert(linkHead, "bbb");
link.insert(linkHead, "ccc");
link.insert(linkHead, "ddd");
link.insert(linkHead, "eee");
link.insertReverse(linkHead, "fff", 1);
link.insertReverse(linkHead, "ggg", 0);
