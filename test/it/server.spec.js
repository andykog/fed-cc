import {expect} from 'chai';
import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import {beforeAndAfter, app} from '../environment';
import {baseURL} from '../test-common';
import {wixAxiosInstanceConfig} from 'wix-axios-config';

const axiosInstance = wixAxiosInstanceConfig(axios, {baseURL, adapter});

describe('When rendering', () => {
  beforeAndAfter();

  it('should display a title', async () => {
    const url = app.getUrl('/');
    const response = await axiosInstance.get(url);

    expect(response.data).to.contain('Wix Full Stack Project Boilerplate');
  });

  it('should return leader board', async () => {
    const url = app.getUrl('/api/leader-board');
    const response = await axiosInstance.get(url);
    expect(response.data).to.be.eql({});
  });

  it('should save leader board', async () => {
    const url = app.getUrl('/api/leader-board');
    const resp1 = await axiosInstance.post(url, {name: 'Andrew'});
    expect(resp1.data).to.be.eql({'Andrew': 1});
    const resp2 = await axiosInstance.post(url, {name: 'Andrew'});
    expect(resp2.data).to.be.eql({'Andrew': 2});
    const leaderBoard = await axiosInstance.get(url);
    expect(leaderBoard.data).to.be.eql({Andrew: 2});
  });

});
