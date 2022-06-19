export class DBUtil {
  static fetchLineData(compareA: string, compareB: string, metric: string) {
    return fetch("/line", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ compareA, compareB, metric }),
    }).then((res) => {
      if (res.ok) return res.json();
      return res.text().then((txt) => {
        throw new Error(txt);
      });
    });
  }


}
