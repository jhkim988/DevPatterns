// indexedDB Class
export class IndexedDB {
    constructor(dbName, version, schema) {
      // indexedDB 를 지원하지 않는 브라우저
      if (!window.indexedDB) {
        throw new Error("Not support indexedDB");
      }
      this.db = null;
      this.dbName = dbName;
      this.version = version;
      this.schema = schema;
    }
  
    // indexedDB 열기
    open() {
      if (this.isOpen()) return;
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(this.dbName, this.version);
  
        // db open 성공 시 이벤트
        request.onsuccess = event => {
          console.log("indexedDB open 성공");
          this.db = request.result;
          resolve(this.db);
        };
  
        // db open 실패 시 이벤트
        request.onerror = event => {
          console.log("indexedDB open 실패");
          reject("indexedDB 요청 에러");
        };
  
        request.onupgradeneeded = event => {
          console.log("indexedDB 업그레이드 필요");
          this.db = event.target.result;
  
          // 해당 이름의 DB 가 없을 경우 에러 발생시킨다.
          if (!this.hasObjectStore(this.dbName)) {
            if (!this.schema) {
              throw new Error("schema 가 없습니다.");
            }
            this.createDB();
          }
        };
      });
    }
  
    // indexedDB close
    close() {
      this.db.close();
      this.db = null;
    }
  
    // BackEnd DB 와 동기화
    syncBackEnd(util, url) {
      return new Promise((resolve, reject) => {
        callApi(util, url).then(response => {
            if (response.resultCode === 200) {
              resolve(this.addAll(response.resultData));
            } else {
              console.error(`resultCode: ${response.resultCode}`)
              reject(response);
            }
          }).catch(error => {
            console.error("syncBackEnd 에러")
            reject(error);
          });
      });
    }
  
    // indexedDB 에 데이터 전체 삽입
    addAll(data) {
      console.log("add all 호출");
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(this.dbName, "readwrite");
        const objectStore = transaction.objectStore(this.dbName);
        console.log(`addAll - 데이터 ${data.length} 개 삽입`);
        data.forEach((item) => {
          objectStore.put(item);
        })
        transaction.oncomplete = event => {
          console.log("transaction 성공");
          resolve(transaction.result);
        };
        transaction.onerror = event => {
          reject("indexedDB 전체 추가 에러");
        };
      });
    }
  
    // indexedDB 에서 특정 조건을 만족하는 데이터 조회
    get(filter) {
      return new Promise((resolve, reject) => {
        console.log("indexedDB get 호출");
        let ret = [];
        const transaction = this.db.transaction(this.dbName, "readonly");
        const objectStore = transaction.objectStore(this.dbName);
        objectStore.openCursor().onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            if (filter(cursor.value)) {
              ret.push(cursor.value);
            }
            cursor.continue();
          } else {
            console.log("indexedDB get 완료");
            resolve(ret);
          }
        }
      })
    }
  
    // schema 로 부터 DB 생성
    createDB() {
      console.log("createDB 호출", this.schema);
      this.db.createObjectStore(this.schema.name, { keyPath: this.schema.keyPath, autoIncrement: this.schema.autoIncrement });
      return new Promise((resolve, reject) => { resolve(this.db); });
    }
  
    hasObjectStore(dbName) {
      if (!this.isOpen()) {
        throw new Error("indexedDB 가 열려있지 않습니다.");
      }
      return this.db.objectStoreNames.contains(dbName);
    }
  
    isOpen() { return this.db !== null; }
  
    // indexedDB 에 데이터 추가
    add(data) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(this.dbName, "readwrite");
        const objectStore = transaction.objectStore(this.dbName);
        const request = objectStore.add(data);
        request.onsuccess = event => { resolve(request.result); };
        request.onerror = event => { reject("indexedDB 추가 에러"); };
      });
    }
  
    // indexedDB 에서 key 를 이용하여 데이터 조회
    getByKey(key) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(this.dbName, "readonly");
        const objectStore = transaction.objectStore(this.dbName);
        const request = objectStore.get(key);
        request.onsuccess = event => { resolve(request.result); };
        request.onerror = event => { reject("indexedDB 조회 에러"); };
      });
    }
  
    // indexedDB 에서 데이터 전체 조회
    getAll() {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(this.dbName, "readonly");
        const objectStore = transaction.objectStore(this.dbName);
        const request = objectStore.getAll();
        request.onsuccess = event => { resolve(request.result); };
        request.onerror = event => { reject("indexedDB 전체 조회 에러"); };
      });
    }
  
    // indexedDB 에서 데이터 수정
    put(data) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(this.dbName, "readwrite");
        const objectStore = transaction.objectStore(this.dbName);
        const request = objectStore.put(data);
        request.onsuccess = event => { resolve(request.result); };
        request.onerror = event => { reject("indexedDB 수정 에러"); };
      });
    }
  
    // indexedDB 에서 데이터 삭제
    delete(key) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(this.dbName, "readwrite");
        const objectStore = transaction.objectStore(this.dbName);
        const request = objectStore.delete(key);
        request.onsuccess = event => { resolve(request.result); };
        request.onerror = event => { reject("indexedDB 삭제 에러"); };
      });
    }
  
    // indexedDB 에서 데이터 전체 삭제
    clear() {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(this.dbName, "readwrite");
        const objectStore = transaction.objectStore(this.dbName);
        const request = objectStore.clear();
        request.onsuccess = event => { resolve(request.result); };
        request.onerror = event => { reject("indexedDB 전체 삭제 에러"); };
      });
    }
  }