import '@testing-library/jest-dom';
import { ipcRenderer } from 'electron';
import {
  fetchTweetsByUserId,
  fetchTweetsByUsername,
} from 'renderer/api/twitter';

jest.mock('electron', () => ({
  ipcRenderer: {
    send: jest.fn(),
  },
}));

describe('Twitter API', () => {
  it('should call fetchTweetsByUsername', () => {
    fetchTweetsByUsername('test');

    expect(ipcRenderer.send).toHaveBeenCalledWith('search-tweets-by-username', {
      username: 'test',
    });
  });

  it('should call fetchTweetsByUserId', () => {
    fetchTweetsByUserId('testId', {
      newest_id: 'newId',
      next_token: 'nextToken',
      oldest_id: 'oldId',
      result_count: 10,
    });

    expect(ipcRenderer.send).toHaveBeenCalledWith('search-tweets-by-username', {
      userId: 'testId',
      meta: {
        newest_id: 'newId',
        next_token: 'nextToken',
        oldest_id: 'oldId',
        result_count: 10,
      },
    });
  });
});
