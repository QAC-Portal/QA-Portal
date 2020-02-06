package com.qa.portal.cv.domain;

public class Feedback {

    private String reviewer;

    private String date;

    private String comment;
    
    private Boolean resolved;
    
    public Feedback() {
        super();
    }

    public String getReviewer() {
        return reviewer;
    }

    public void setReviewer(String reviewer) {
        this.reviewer = reviewer;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

	public Boolean getResolved() {
		return resolved;
	}

	public void setResolved(Boolean resolved) {
		this.resolved = resolved;
	}

    @Override
    public String toString() {
        return "Feedback [reviewer=" + reviewer + ", date=" + date + ", comment=" + comment + "]";
    }

}
