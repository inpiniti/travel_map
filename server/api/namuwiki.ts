import axios from "axios";
import * as cheerio from "cheerio";

export default defineEventHandler(async (event) => {
  const scrapeNamuWiki = async () => {
    const url =
      "https://namu.wiki/w/%ED%9B%84%EC%BF%A0%EC%98%A4%EC%B9%B4%EC%8B%9C?from=%ED%9B%84%EC%BF%A0%EC%98%A4%EC%B9%B4";

    try {
      // axios를 사용하여 웹 페이지의 HTML을 가져옵니다.
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "text/html",
        },
        responseType: "text",
      });

      // cheerio를 사용하여 HTML을 파싱합니다.
      const $ = cheerio.load(data);

      // .Xg8bWR6v 클래스를 가진 모든 div 요소를 선택합니다.
      const class1Divs = $("div.Xg8bWR6v");

      // .Imb4r44D 클래스를 가진 모든 div 요소를 선택합니다.
      const class2Divs = $("div.Imb4r44D");

      // 두 선택 결과를 합칩니다.
      const allDivs = class1Divs.add(class2Divs);

      // 선택된 모든 div 요소들의 HTML 문자열을 합쳐서 반환합니다.
      let combinedHtml = "";
      allDivs.each((index, element) => {
        combinedHtml += $.html(element);
      });

      return combinedHtml;
    } catch (error) {
      console.error("Error:", error);
      return "스크래핑 중 오류가 발생했습니다.";
    }
  };

  // 스크래핑 함수를 호출하고 결과를 출력합니다.
  try {
    const content = await scrapeNamuWiki();

    // 응답 헤더 설정
    event.node.res.setHeader("Content-Type", "text/html; charset=utf-8");

    return content;
  } catch (error) {
    console.error("Error:", error);
    return "스크래핑 중 오류가 발생했습니다.";
  }
});
