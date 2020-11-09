import {
  ADD_EXPERIENCE,
  GET_PROFILE,
  PROFILE_ERROR,
  ADD_EDUCATION,
  DELETE_EXPERIENCE,
  PUT_EXPERIENCE,
  PUT_EDUCATION,
  DELETE_EDUCATION,
  CLEAR_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload.data.docs[0],
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        profile: action.payload,
        loading: false,
      };

    case ADD_EXPERIENCE: {
      return {
        ...state,

        profile: {
          ...state.profile,
          experience: [...state.profile.experience, action.payload],
        },
        loading: false,
      };
    }

    case ADD_EDUCATION: {
      return {
        ...state,

        profile: {
          ...state.profile,
          education: [...state.profile.education, action.payload],
        },
        loading: false,
      };
    }

    case PUT_EXPERIENCE: {
      console.log(action.payload);

      return {
        ...state,

        profile: {
          ...state.profile,
          experience: state.profile.experience.map((exp) =>
            exp._id === action.payload._id ? (exp = action.payload) : exp
          ),
        },
        loading: false,
      };
    }
    case DELETE_EXPERIENCE: {
      return {
        ...state,
        profile: {
          ...state.profile,
          experience: state.profile.experience.filter(
            (exp) => exp._id !== action.payload
          ),
        },
        loading: false,
      };
    }
    case PUT_EDUCATION: {
      console.log(action.payload);

      return {
        ...state,

        profile: {
          ...state.profile,
          education: state.profile.education.map((edu) =>
            edu._id === action.payload._id ? (edu = action.payload) : edu
          ),
        },
        loading: false,
      };
    }
    case DELETE_EDUCATION: {
      return {
        ...state,
        profile: {
          ...state.profile,
          education: state.profile.education.filter(
            (edu) => edu._id !== action.payload
          ),
        },
        loading: false,
      };
    }
    case CLEAR_PROFILE: {
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    }
    default:
      return state;
  }
}
