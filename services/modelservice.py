from flask import Flask, request
import pickle
loaded_model = pickle.load(open('../models/anoabot_model_v1.pkl', 'rb'))
label = { 0: 'Aman', 1: 'Penipuan', 2: 'Promo' }

def deEmojify(inputString):
    return inputString.encode('ascii', 'ignore').decode('ascii')

app = Flask(__name__)
@app.route("/query")
def query():

    message = deEmojify(request.args.get('msg'))
    result = loaded_model.predict([message])
    print(result)
    hasil = label[int(result[0])]
    return 'Anoa Bot Mendeteksin bahwa pesan tersebut adalah jenis 🤖 {} 🤖, \n\nuntuk mendeteksi lagi cukup kirim saja pesan "!anoacek <pesan>" atau foward pesan kesini, atau undang ke grup juga bisa'.format(hasil)

app.run(debug=True, port=5000)