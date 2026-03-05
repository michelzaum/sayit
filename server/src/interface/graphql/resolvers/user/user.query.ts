export const userQuery = {
  getUser: async (_, args, { getUserUseCase }) => {
    const userId = args.id;
    return await getUserUseCase.execute(userId);
  },
};
