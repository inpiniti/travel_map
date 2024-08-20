import axios from "axios";
import * as cheerio from "cheerio";

export default defineEventHandler(async (event) => {
  const word = getRouterParam(event, "word");
  const scrapeNamuWiki = async () => {
    const url = `https://namu.wiki/w/${word}`;

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
      const class1Divs = $("h2.wiki-heading");

      // .Imb4r44D 클래스를 가진 모든 div 요소를 선택합니다.
      const class2Divs = $("div.wiki-paragraph");

      // table.AVEibs0x 요소도 선택해서 추가하게 해줘
      const class3Divs = $("table.wiki-table");

      // 두 선택 결과를 합칩니다.
      const allDivs = class1Divs.add(class2Divs).add(class3Divs);

      // 선택된 모든 div 요소들의 HTML 문자열을 합쳐서 반환합니다.
      let combinedHtml = "";
      let lastHeading: any = null;
      let tableDisplayed = false;

      allDivs.each((index, element) => {
        if ($(element).is("h2.wiki-heading")) {
          lastHeading = element;
          combinedHtml += $.html(element);
          tableDisplayed = false; // 새로운 헤딩이 나오면 테이블 표시 여부를 초기화
        } else if ($(element).is("table.wiki-table")) {
          if (lastHeading) {
            combinedHtml += $.html(element);
            tableDisplayed = true; // 테이블이 표시되었음을 기록
          }
        } else if ($(element).is("div.wiki-paragraph")) {
          if (lastHeading && !tableDisplayed) {
            combinedHtml += $.html(element);
          }
        }
      });

      // combinedHtml = "";
      // class3Divs.each((index, element) => {
      //   combinedHtml += $.html(element);
      // });

      return combinedHtml;
    } catch (error) {
      console.error("Error:", error);
      return false;
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
    return false;
  }
});
