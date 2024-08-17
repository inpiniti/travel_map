import axios from "axios";

export default defineEventHandler(async (event) => {
  const word = getRouterParam(event, "word");
  const url = `https://www.google.co.kr/search?tbm=map&hl=ko&gl=kr&pb=!4m12!1m3!1d3994.375618998408!2d130.40852251176685!3d33.589798841895025!2m3!1f0!2f0!3f0!3m2!1i1419!2i923!4f13.1!7i20!10b1!12m20!1m2!18b1!30b1!2m3!5m1!6e2!20e3!10b1!12b1!13b1!16b1!17m1!3e1!20m3!5e2!6b1!14b1!46m1!1b0!94b1!19m4!2m3!1i360!2i120!4i8!20m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m42!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e9!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!2b1!4b1!9b0!22m6!1sRovAZsbQMNvO1e8P9a3ImAE%3A787!2s1i%3A0%2Ct%3A11886%2Cp%3ARovAZsbQMNvO1e8P9a3ImAE%3A787!7e81!12e5!17sRovAZsbQMNvO1e8P9a3ImAE%3A996!18e15!24m100!1m31!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m20!3b1!4b1!5b1!6b1!9b1!12b1!13b1!14b1!17b1!20b1!21b1!22b1!25b1!27m1!1b0!28b0!31b0!32b0!33m1!1b0!10m1!8e3!11m1!3e1!14m1!3b1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!29b1!30m1!2b1!36b1!39m3!2m2!2i1!3i1!43b1!52b1!54m1!1b1!55b1!56m1!1b1!65m5!3m4!1m3!1m2!1i224!2i298!71b1!72m19!1m5!1b1!2b1!3b1!5b1!7b1!4b1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_reviews!6m1!1e1!9b1!89b1!103b1!113b1!114m3!1b1!2m1!1b1!117b1!122m1!1b1!125b0!126b1!127b1!26m4!2m3!1i80!2i92!4i8!30m28!1m6!1m2!1i0!2i0!2m2!1i530!2i923!1m6!1m2!1i1369!2i0!2m2!1i1419!2i923!1m6!1m2!1i0!2i0!2m2!1i1419!2i20!1m6!1m2!1i0!2i903!2m2!1i1419!2i923!34m18!2b1!3b1!4b1!6b1!8m6!1b1!3b1!4b1!5b1!6b1!7b1!9b1!12b1!14b1!20b1!23b1!25b1!26b1!37m1!1e81!42b1!47m0!49m9!3b1!6m2!1b1!2b1!7m2!1e3!2b1!8b1!9b1!50m4!2e2!3m2!1b1!3b1!61b1!67m2!7b1!10b1!69i702&q=${word}&oq=${word}`;

  const response = await axios(url);

  try {
    let data = response.data;

    // 불필요한 부분 제거
    if (data.startsWith(")]}'")) {
      data = data.slice(4);
    }

    // JSON으로 파싱
    const jsonData = JSON.parse(data);

    // 필요한 정보 추출
    let result = parseLocationData(jsonData);
    if (result.latitude === null || result.longitude === null) {
      result = parseLocationData(jsonData, 1);
    }

    // 추출한 정보 반환
    return result;
  } catch (error) {
    console.error("Error parsing the data:", error);
    return null;
  }
});

const parseLocationData = (jsonData: any, index: number = 0) => {
  const data = jsonData?.[0]?.[1]?.[index]?.[14];

  const extractData = (filterCondition: (time: any) => boolean) =>
    data?.[84]?.[0]?.[0]?.[1]
      .filter(filterCondition)
      .map((time: any) => time[4]) || null;

  const rating = data?.[4]?.[7];
  const reviews = data?.[4]?.[8];
  const latitude = data?.[9]?.[2] ?? null;
  const longitude = data?.[9]?.[3] ?? null;
  const name = data?.[11] ?? null;
  const type = data?.[13]?.[0] ?? null;
  const description = (data?.[32]?.[1]?.[1] || data?.[32]?.[0]?.[1]) ?? null;
  const opening = data?.[34]?.[1]?.[0]?.[1]?.[0] || null;
  const veryRelaxed = extractData((time: any) => {
    return time[1] > 0 && time[1] <= 20;
  });
  const relaxed = extractData((time: any) => {
    return time[1] > 20 && time[1] <= 40;
  });
  const moderate = extractData((time: any) => {
    return time[1] > 40 && time[1] <= 60;
  });
  const somewhatCrowded = extractData((time: any) => {
    return time[1] > 60 && time[1] <= 80;
  });
  const veryCrowded = extractData((time: any) => {
    return time[1] > 80;
  });

  const imageId = data?.[72]?.[0]?.[0]?.[0];
  const image = imageId
    ? `https://lh5.googleusercontent.com/p/${imageId}`
    : null;

  return {
    rating,
    reviews,
    latitude,
    longitude,
    name,
    type,
    description,
    image,
    opening,
    veryRelaxed,
    relaxed,
    moderate,
    somewhatCrowded,
    veryCrowded,
  };
};
