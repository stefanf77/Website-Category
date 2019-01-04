var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();


chai.use(chaiHttp);

const url = "http://localhost:8000";

describe('Parameters API tests', function () {
    it('should return bad request for bad website link', function(done) {
        const websiteLink = "bad website";
        chai.request(url)
            .post('/api/category')
            .send({websiteLink})
            .end(function(err, res) {
                res.body.error.should.equal("Could not fetch URL: Invalid URL specified");
                res.should.have.status(400);
                done();
            });
    });

    it('should return bad request for no website link', function(done) {
        chai.request(url)
            .post('/api/category')
            .end(function(err, res) {
                res.body.error.should.equal("invalid request");
                res.should.have.status(400);
                done();
            });
    });
});

describe('Valid API tests', function () {
    it('should return correct category', function(done) {
        const websiteLink = "https://nodejs.org/api/http.html";
        chai.request(url)
            .post('/api/category')
            .send({websiteLink})
            .end(function(err, res) {
                res.body.should.equal("/technology and computing/hardware/computer/servers");
                res.should.have.status(200);
                done();
            });
    });
});