FROM python:3.7-alpine

RUN mkdir -p /home/app

RUN apk add --no-cache gcc musl-dev linux-headers

COPY ./requirements.txt /usr/src/app/requirements.txt

RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

WORKDIR /usr/src/app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /usr/src/app/

EXPOSE 5000

RUN ["chmod", "+x", "/usr/src/app/entrypoint.sh"]

RUN ls -la .

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

CMD ["flask", "run"]