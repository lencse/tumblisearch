CREATE TABLE searches (
    id                      UUID PRIMARY KEY,
    search_date             TIMESTAMP WITH TIME ZONE NOT NULL,
    blog_name               VARCHAR(200) NOT NULL,
    search_text             VARCHAR(500) NOT NULL
);

CREATE INDEX searches_search_date_idx ON searches (search_date);
