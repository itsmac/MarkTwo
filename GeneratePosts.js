const dummyData = (idx) => ({
    id: idx,
    title: `My title ${idx}`,
    description: `My description ${idx}`
});

function generatePosts(limit, cursor) {
    const pageStart = cursor * 10;
    if (pageStart >= limit * 5) return [];
    const posts = Array.from({ length: limit }, (_, i) => dummyData(pageStart + i));
    return posts;
}

const getRandomResponseTime = () => Math.random() * 3000;
export async function fetchPostsData(limit, cursor) {
    return new Promise(resolve => {
        const posts = generatePosts(limit, cursor);
        setTimeout(() => {
            resolve(posts);
        }, getRandomResponseTime());
    })
}
