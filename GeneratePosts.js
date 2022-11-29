const dummyData = (idx, searchTerm = '') => ({
    id: idx,
    title: `My title ${idx} and ${searchTerm }`,
    description: `My description ${idx}`
});

function generatePosts(limit, cursor, searchTerm='') {
    const pageStart = cursor * 10;
    if (pageStart >= limit * 5) return [];
    const posts = Array.from({ length: limit }, (_, i) => dummyData(pageStart + i,searchTerm));
    return posts;
}

const getRandomResponseTime = () => Math.random() * 3000;
export async function fetchPostsData(limit, cursor,searchTerm) {
    return new Promise(resolve => {
        const posts = generatePosts(limit, cursor,searchTerm);
        setTimeout(() => {
            resolve(posts);
        }, getRandomResponseTime());
    })
}
