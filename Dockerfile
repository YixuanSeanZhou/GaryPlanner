FROM python:3.7-alpine

RUN mkdir -p /home/app

RUN apk add --no-cache gcc musl-dev linux-headers

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /app

EXPOSE 5000

CMD ["flask", "run"]