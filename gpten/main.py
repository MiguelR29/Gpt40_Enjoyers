from gpten.gemini import *
from gpten.mongo import *
from gpten.cloudflare import *
from flask import Flask,request,jsonify
from flask_cors import CORS 

app =  Flask(__name__)


@app