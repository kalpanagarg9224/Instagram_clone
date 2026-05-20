export const groupStoryByUser = (stories) => {

    const groupedStories = {};

    stories.forEach((story) => {

        if (!groupedStories[story.user.id]) {
            groupedStories[story.user.id] = [];
        }

        groupedStories[story.user.id].push(story);

    });

    return Object.values(groupedStories);
};