import React, { useState } from 'react';
import { FaCuttlefish, FaCopy, FaCheck } from 'react-icons/fa';

const snippets = {
  array: `// 1. Array Operations in C
#include <stdio.h>
#define MAX 100

void display(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int insert(int arr[], int *n, int pos, int value) {
    if (*n >= MAX) return -1;
    for (int i = *n; i > pos; i--)
        arr[i] = arr[i - 1];
    arr[pos] = value;
    (*n)++;
    return 1;
}

int delete(int arr[], int *n, int pos) {
    if (pos < 0 || pos >= *n) return -1;
    for (int i = pos; i < *n - 1; i++)
        arr[i] = arr[i + 1];
    (*n)--;
    return 1;
}

int main() {
    int arr[MAX] = {10, 20, 30};
    int n = 3;
    insert(arr, &n, 1, 15); // 10 15 20 30
    display(arr, n);
    return 0;
}`,

  stack: `// 2. Stack (LIFO) using Array in C
#include <stdio.h>
#define MAX 100

typedef struct {
    int top;
    int items[MAX];
} Stack;

void init(Stack *s) { s->top = -1; }

void push(Stack *s, int value) {
    if (s->top == MAX - 1) return;
    s->items[++s->top] = value;
}

int pop(Stack *s) {
    if (s->top == -1) return -1;
    return s->items[s->top--];
}

int peek(Stack *s) {
    if (s->top == -1) return -1;
    return s->items[s->top];
}

int main() {
    Stack s; init(&s);
    push(&s, 10);
    push(&s, 20);
    printf("%d", pop(&s)); // 20
    return 0;
}`,

  heap: `// 3. Max Heap in C
#include <stdio.h>
#define MAX 100

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}

void insert(int arr[], int *n, int value) {
    if (*n == MAX) return;
    arr[*n] = value;
    int i = *n;
    (*n)++;
    // Heapify Up
    while (i != 0 && arr[(i - 1) / 2] < arr[i]) {
        int temp = arr[i];
        arr[i] = arr[(i - 1) / 2];
        arr[(i - 1) / 2] = temp;
        i = (i - 1) / 2;
    }
}

void extractMax(int arr[], int *n) {
    if (*n <= 0) return;
    arr[0] = arr[*n - 1];
    (*n)--;
    heapify(arr, *n, 0);
}`,

  hashtable: `// 4. Double Hashing in C
#include <stdio.h>
#define SIZE 31

typedef struct {
    int key;
    int value;
    int isOccupied;
} HashItem;

HashItem table[SIZE];

int h1(int key) { return key % SIZE; }

int h2(int key) { return 1 + (key % (SIZE - 1)); }

void insert(int key, int value) {
    int index = h1(key);
    int step = h2(key);
    int i = 0;

    // Probe until empty slot or full
    while (table[index].isOccupied && i < SIZE) {
        if (table[index].key == key) { // Update
            table[index].value = value;
            return;
        }
        index = (index + step) % SIZE;
        i++;
    }

    if (i < SIZE) {
        table[index].key = key;
        table[index].value = value;
        table[index].isOccupied = 1;
        printf("Inserted %d at index %d (Probes: %d)\\n", key, index, i+1);
    }
}`,

  bst: `// 5. Binary Search Tree (BST) in C
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *left, *right;
} Node;

Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->left = newNode->right = NULL;
    return newNode;
}

Node* insert(Node* node, int data) {
    if (node == NULL) return createNode(data);

    if (data < node->data)
        node->left = insert(node->left, data);
    else if (data > node->data)
        node->right = insert(node->right, data);

    return node;
}

void inOrder(Node* root) {
    if (root != NULL) {
        inOrder(root->left);
        printf("%d ", root->data);
        inOrder(root->right);
    }
}`
};

const CodeExplanation = () => {
  const [activeTab, setActiveTab] = useState('array');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-12 items-start">
        <div className="flex-1 w-full">
          <h2 className="text-3xl font-extrabold text-white mb-6 flex items-center gap-3">
            <FaCuttlefish className="text-blue-500" /> Core Implementation
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Standard <b>C Language</b> implementations of the 5 core Data Structures used in this project.
            These algorithms mirror the logic running in the visualizers above.
          </p>

          <div className="flex flex-wrap gap-3">
            {Object.keys(snippets).map(key => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`text-left px-5 py-3 rounded-lg border transition-all ${activeTab === key
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750 hover:border-slate-600'
                  }`}
              >
                <span className="font-bold uppercase text-sm tracking-wider">{key.replace('hashtable', 'Hash Table')}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-[1.5] w-full relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-[#0e1117] rounded-xl border border-slate-800 p-0 font-mono text-sm overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-950/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <FaCuttlefish className="text-blue-500" />
                core_{activeTab}.c
              </div>
              <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors">
                {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
              </button>
            </div>
            <pre className="text-slate-300 p-6 overflow-x-auto custom-scrollbar max-h-[500px]">
              <code>{snippets[activeTab]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeExplanation;
