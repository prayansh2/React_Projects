export const initialData = [
    {
      id: 1,
      name: "root",
      isFolder: true,
      children: [
        {
          id: 2,
          name: "src",
          isFolder: true,
          children: [
            { id: 3, name: "index.js", isFolder: false },
            { id: 4, name: "App.js", isFolder: false },
          ],
        },
        {
          id: 5,
          name: "public",
          isFolder: true,
          children: [{ id: 6, name: "index.html", isFolder: false }],
        },
      ],
    },
  ];
  