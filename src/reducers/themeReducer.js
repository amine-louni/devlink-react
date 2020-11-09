const initialTheme = false;

export default (theme = initialTheme, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return !theme;

    default:
      return theme;
  }
};
