#!/usr/bin/env node

const axios = require("axios");
const open = require("open");

const problemID = parseInt(process.argv[2]) || 1;

let url = "https://leetcode.com/graphql";
let query = `
  query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
    problemsetQuestionList: questionList(categorySlug: $categorySlug limit: $limit skip: $skip filters: $filters) {
      total: totalNum
      questions: data {
        frontendQuestionId: questionFrontendId
        paidOnly: isPaidOnly
        title
        titleSlug
      }
    }
  }
`;

let body = {
  query: query,
  variables: {
    categorySlug: "",
    skip: problemID - 1,
    limit: 1,
    filters: {},
  },
};

(async () => {
  const { data } = await axios.post(url, body);
  const problemSlug = data.data.problemsetQuestionList.questions[0].titleSlug;
  const urlToOpen = `https://leetcode.com/problems/${problemSlug}/`;

  console.log(`Opening ${urlToOpen}`);

  // open url in browser
  await open(urlToOpen);
})();
