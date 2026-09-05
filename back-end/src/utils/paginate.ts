export const paginate = <T>(items: T[], page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
        data: items.slice(start, end),
        meta: {
            page,
            pageSize,
            total: items.length,
        },
    };
};
